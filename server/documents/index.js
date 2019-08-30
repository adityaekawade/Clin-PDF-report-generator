module.exports = ({ title, description, project_id, sample_id, payload}) => {
    const today = new Date();
    console.log("description", description);
    const variants = payload.variants;

    var significantVariants = [];
    variants.map(x=>{
      if(x.interpretation==="sig"){
        significantVariants.push(x);
      }
    })
    console.log("significantVariants", significantVariants);

    var unknownSignificantVariants = [];
    variants.map(x=>{
      if(x.interpretation==="unknown-sig"){
        unknownSignificantVariants.push(x);
      }
    })
    // require('handlebars');
    var slides1 = ["slide 111", "slide 12", "slide 31", "slide 41", "slide 51"]
return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
          body{
            font-size:12px;
          }
          .alertText {
            font-size: 15px;
          }
          .alert{
            width: 80%;
          }
          thead {
            font-weight: 800;
          }
          tbody {
            font-size: 12px;
          }
          * {
              box-sizing: border-box;
            }

            /* Create three equal columns that floats next to each other */
            .column {
              float: left;
              width: 33%;
              padding: 10px;
            }

            /* Clear floats after the columns */
            .row:after {
              content: "";
              display: table;
              clear: both;
            }
        </style>
      </head>
      <body>
        <div class="container" style="width:80%">
          <div class="row mt-5 mb-4">
            <div class="col-xs-3">
              <img width="20%" src="data:image/png;base64,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" alt="">
            </div>

          </div>
          <!-- End header  -->

          <!-- Start summary -->
          <div class="alert alert-primary" role="alert">
            <h2 style="font-size: 17px">Summary</h2>
          </div>
          <div class="row mb-5" style="width:90%; font-size: 12px">
            <div class="column" >
              Date of Birth: <strong>04/15/1950</strong>
              <br>
              Gender: <strong>Female</strong>
              <br>
              Medical Record #: <strong>00123456</strong>
              <br>
              Additional Recipients: <strong>John Doe</strong>
            </div>
            <div class="column" >
              Provider: <span style="font-weight: 800 !important">Intermountain Healthcare</span>
              <br>
              Physician: <strong>Dr. Jane Smith</strong>
              <br>
              Pathologist: <strong>Dr. John Brown</strong>
            </div>
            <div class="column" >
              Specimen ID #: <strong>1234567</strong>
              <br>
              Date Collected: <strong>09/09/2016</strong>
              <br>
              Specimen Site: <strong>Breast</strong>
              <br>
              Specimen Grade: <strong>III</strong>
            </div>
          </div>

          <!-- End Summary -->

          <!-- Start clinical description -->
          <div class="alert alert-primary" role="alert">
            <div class="alertText">Clinical Description</div>
          </div>
          <div class="mb-5">
            ${description}
          </div>
          <!-- End clinical description -->

          <!-- Start unknown significance  -->
          <div class="alert alert-primary" role="alert">
            <strong class="alertText">Pathogenic variants </strong>
          </div>
          <div class="mb-5" style="width:80%">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Gene</th>
                  <th scope="col">Location</th>
                  <th scope="col">CSN</th>
                  <th scope="col">Consequence</th>
                  <th scope="col">dbSNP ID</th>
                  <th scope="col">Inheritance</th>
                </tr>
              </thead>
              <tbody>
                ${significantVariants.map(function(item){
                  return "<tr><th scope='row'>" + item.gene + "</th><td>" + item.chrom + "</td><td>" + item.transcript + "</td><td>" + item.consequence + "</td><td>" + item.rsId + "</td><td>" + item.inheritance + "</td>  </tr>"
                }).join("")}
              </tbody>
            </table>
          </div>
          <!-- End unknown significance -->

          <!-- start VUS interpretation -->
          <div class="alert alert-primary" role="alert">
            <strong class="alertText">Variants of unknown significance</strong>
          </div>
          <div class="mb-5" style="width:80%">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Gene</th>
                  <th scope="col">Location</th>
                  <th scope="col">CSN</th>
                  <th scope="col">Consequence</th>
                  <th scope="col">dbSNP ID</th>
                  <th scope="col">Inheritance</th>
                </tr>
              </thead>
              <tbody>
                ${unknownSignificantVariants.map(function(item){
                  return "<tr><th scope='row'>" + item.gene + "</th><td>" + item.chrom + "</td><td>" + item.transcript + "</td><td>" + item.consequence + "</td><td>" + item.rsId + "</td><td>" + item.inheritance + "</td>  </tr>"
                }).join("")}
              </tbody>
            </table>
          </div>
          <div class="mb-5">
            Words...
          </div>
          <!-- end VUS interpretation -->

          <!-- start Therapeutic opportunities -->
          <div class="alert alert-primary" role="alert">
            <strong class="alertText">Therapeutic opportunities</strong>
          </div>
          <div class="mb-5">
            Words...
          </div>
          <!-- end Therapeutic opportunities -->

      
          <!-- start Disclaimers -->
          <div class="alert alert-primary" role="alert">
            <strong class="alertText">Disclaimers</strong>
          </div>
          <div class="mb-5">
            Genetic testing information has caveats and should not be considered a definitive diagnosis.
          </div>
          <!-- end Disclaimers -->

          <!-- start References/Methodology -->
          <div class="alert alert-primary" role="alert">
            <strong class="alertText">References/Methodology</strong>
          </div>
          <div class="mb-5">
            DNA sequencing was performed in accordance with established Utah Genome Project (UGP) methodologies including sample preparation, sequencing and data analysis.
          </div>
          <!-- end References/Methodology -->

          <!-- Start secondary findings section -->
          <div class="alert alert-warning" role="alert">
            <h2>Secondary findings</h2>
          </div>
          <!-- end secondary findings section -->

        </div>

      </body>
    </html>
    `;
};
