use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_multipart::{
    form::{
        tempfile::{TempFile},
        MultipartForm,
    },
};
use log::{info, trace};
use ezkl::graph::{ ModelCircuit};
use ezkl::pfsys::{gen_srs, prepare_model_circuit_and_public_input, load_params_kzg, create_keys};
use ezkl::pfsys::evm::aggregation::{
    PoseidonTranscript,
};
use ezkl::pfsys::{Snark};
use ezkl::pfsys::{
    create_proof_circuit, prepare_data,
    save_vk,
};
use ezkl::commands::{StrategyType, TranscriptType};
use halo2_proofs::plonk::{Circuit, ProvingKey};
use halo2_proofs::poly::kzg::strategy::AccumulatorStrategy;
use halo2_proofs::poly::kzg::commitment::KZGCommitmentScheme;
use halo2_proofs::poly::kzg::multiopen::ProverGWC;
use halo2_proofs::poly::kzg::{
    commitment::ParamsKZG, multiopen::VerifierGWC, strategy::SingleStrategy as KZGSingleStrategy,
};
use halo2_proofs::poly::VerificationStrategy;
use halo2_proofs::transcript::{Blake2bRead, Blake2bWrite, Challenge255};
use halo2curves::bn256::{Bn256, Fr, G1Affine};
use snark_verifier::loader::native::NativeLoader;
use snark_verifier::system::halo2::transcript::evm::EvmTranscript;
use std::error::Error;
use std::time::Instant;


const K: u32 = 17;

#[get("/")]
async fn hello() -> impl Responder {
    generate_proof();
    HttpResponse::Ok().body("Hello world!")
}


#[post("/getProof")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[derive(Debug, MultipartForm)]
struct UploadForm {
    #[multipart(rename = "file")]
    files: Vec<TempFile>,
}

#[post("/getVerifierBytecode")]
async fn get_verifier_bytecode(
    MultipartForm(form): MultipartForm<UploadForm>,
    architecture: String,
    name: String,
    data: String,
) -> Result<impl Responder, Error> {
    for f in form.files {
        let path = format!("./tmp/model.onnx");
        log::info!("saving to {path}");
        f.file.persist(path).unwrap();
    }
    
    let params = gen_srs::<KZGCommitmentScheme<Bn256>>(K);
    println!("params {:?}", params);

    Ok(HttpResponse::Ok().body("success"))
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    log::info!("creating temporary upload directory");
    std::fs::create_dir_all("./tmp")?;

    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}


fn generate_proof (
    data,
    vk_path,
    proof_path,
    params_path,
    pfsys,
    transcript,
    strategy,
) {
    let data = prepare_data(data)?;
    let (circuit, public_inputs) =
        prepare_model_circuit_and_public_input(&data, &cli)?;
    let mut params: ParamsKZG<Bn256> = load_params_kzg(params_path.to_path_buf())?;
    params.downsize(cli.args.logrows);
    let pk = create_keys::<KZGCommitmentScheme<Bn256>, Fr, ModelCircuit<Fr>>(
        &circuit, &params,
    )
    .map_err(Box::<dyn Error>::from)?;
    trace!("params computed");

    let now = Instant::now();
    // creates and verifies the proof
    let snark = match strategy {
        StrategyType::Single => {
            let strategy = KZGSingleStrategy::new(&params);
            create_proof_circuit_kzg(
                circuit,
                &params,
                public_inputs,
                &pk,
                transcript,
                strategy,
            )?
        }
        StrategyType::Accum => {
            let strategy = AccumulatorStrategy::new(&params);
            create_proof_circuit_kzg(
                circuit,
                &params,
                public_inputs,
                &pk,
                transcript,
                strategy,
            )?
        }
    };

    info!("proof took {}", now.elapsed().as_secs());

    snark.save(proof_path)?;
    save_vk::<KZGCommitmentScheme<Bn256>>(vk_path, pk.get_vk())?;
}


/// helper function
fn create_proof_circuit_kzg<
    'params,
    C: Circuit<Fr>,
    Strategy: VerificationStrategy<'params, KZGCommitmentScheme<Bn256>, VerifierGWC<'params, Bn256>>,
>(
    circuit: C,
    params: &'params ParamsKZG<Bn256>,
    public_inputs: Vec<Vec<Fr>>,
    pk: &ProvingKey<G1Affine>,
    transcript: TranscriptType,
    strategy: Strategy,
) -> Result<Snark<Fr, G1Affine>, Box<dyn Error>> {
    match transcript {
        TranscriptType::EVM => create_proof_circuit::<
            KZGCommitmentScheme<_>,
            Fr,
            _,
            ProverGWC<_>,
            VerifierGWC<_>,
            _,
            _,
            EvmTranscript<G1Affine, _, _, _>,
            EvmTranscript<G1Affine, _, _, _>,
        >(circuit, public_inputs, params, pk, strategy)
        .map_err(Box::<dyn Error>::from),
        TranscriptType::Poseidon => create_proof_circuit::<
            KZGCommitmentScheme<_>,
            Fr,
            _,
            ProverGWC<_>,
            VerifierGWC<_>,
            _,
            _,
            PoseidonTranscript<NativeLoader, _>,
            PoseidonTranscript<NativeLoader, _>,
        >(circuit, public_inputs, params, pk, strategy)
        .map_err(Box::<dyn Error>::from),
        TranscriptType::Blake => create_proof_circuit::<
            KZGCommitmentScheme<_>,
            Fr,
            _,
            ProverGWC<_>,
            VerifierGWC<'_, Bn256>,
            _,
            Challenge255<_>,
            Blake2bWrite<_, _, _>,
            Blake2bRead<_, _, _>,
        >(circuit, public_inputs, params, pk, strategy)
        .map_err(Box::<dyn Error>::from),
    }
}