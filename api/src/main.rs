use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, Error};
use actix_multipart::{
    form::{
        tempfile::{TempFile},
        MultipartForm,
    },
};
use ezkl::pfsys::{gen_srs};
use halo2_proofs::poly::kzg::commitment::KZGCommitmentScheme;
use halo2curves::bn256::{Bn256};

const K: u32 = 17;

use std::process::Command;
use std::process::Output;
use std::fs;
use actix_cors::Cors;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}


#[post("/getProof")]
async fn echo(req_body: String) -> impl Responder {
    //println!("params {:?}", params);
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
) -> impl Responder {
    for f in form.files {
        let path = format!("./network.onnx");
        log::info!("saving to {path}");
        f.file.persist(path).unwrap();
    }

    let output = generate_bytecode();

    HttpResponse::Ok().body(output)
}

fn generate_bytecode () -> String {

    let output1: Output = Command::new("../../ezkl/target/release/ezkl")
        .arg("-K=17")
        .arg("gen-srs")
        .arg("--pfsys=kzg")
        .arg("--params-path=kzg.params")
        .output()
        .expect("failed to execute process");

        println!("status: {}", output1.status);
        println!("stdout: {}", String::from_utf8_lossy(&output1.stdout));
        println!("stderr: {}", String::from_utf8_lossy(&output1.stderr));

    let output2 = Command::new("../../ezkl/target/release/ezkl")
                     .arg("--bits=16")
                     .arg("-K=17")
                     .arg("prove")
                     .arg("-D")
                     .arg("./input.json")
                     .arg("-M")
                     .arg("./network.onnx")
                     .arg("--proof-path")
                     .arg("./1l_relu.pf")
                     .arg("--vk-path")
                     .arg("./1l_relu.vk")
                     .arg("--params-path=kzg.params")
                     .output()
                     .expect("failed to execute process");
    println!("status: {}", output2.status);
    println!("stdout: {}", String::from_utf8_lossy(&output2.stdout));
    println!("stderr: {}", String::from_utf8_lossy(&output2.stderr));

    let output3 = Command::new("../../ezkl/target/release/ezkl")
                     .arg("-K=17")
                     .arg("--bits=16")
                     .arg("create-evm-verifier")
                     .arg("-D")
                     .arg("./input.json")
                     .arg("-M")
                     .arg("./network.onnx")
                     //.arg("--pfsys=kzg")
                     .arg("--deployment-code-path")
                     .arg("./1l_relu.code")
                     .arg("--params-path=kzg.params")
                     .arg("--vk-path")
                     .arg("./1l_relu.vk")
                     .arg("--sol-code-path")
                     .arg("./1l_relu.sol")
                     .output()
                     .expect("failed to execute process");
    println!("status: {}", output3.status);
    println!("stdout: {}", String::from_utf8_lossy(&output3.stdout));
    println!("stderr: {}", String::from_utf8_lossy(&output3.stderr));

    let contents = fs::read_to_string("./1l_relu.code")
        .expect("Should have been able to read the file");

    let model_size = std::fs::metadata("./network.onnx").unwrap().len();

    let file_len_str = model_size.to_string();

    let repl_str = format!("\"onnx_length\":{}, \"code\"", &file_len_str);

    let result = str::replace(&contents, "\"code\"", &repl_str);

    println!("RES {}", result);

    result

}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    fs::remove_file("network.onnx").ok();
    //generate_bytecode();

    //log::info!("creating temporary upload directory");
    //std::fs::create_dir_all("./tmp")?;



    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .service(hello)
            .service(echo)
            .service(get_verifier_bytecode)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
