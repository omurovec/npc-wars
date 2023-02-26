use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use ezkl::pfsys::{gen_srs};
use halo2_proofs::poly::kzg::commitment::KZGCommitmentScheme;
use halo2curves::bn256::{Bn256};

const K: u32 = 17;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/getVerifierBytecode")]
async fn echo(req_body: String) -> impl Responder {
    let params = gen_srs::<KZGCommitmentScheme<Bn256>>(K);
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
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
