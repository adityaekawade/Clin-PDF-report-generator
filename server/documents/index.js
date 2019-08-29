module.exports = ({ name, variant1, variant2, receiptId, gene1, gene2, imageSrc }) => {
    const today = new Date();
    // require('handlebars');
    var slides1 = ["slide 111", "slide 12", "slide 31", "slide 41", "slide 51"]

return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>

       </head>
       <body>
       <p>{{name}}</p>
       ${slides1.map(function(key){
           return "<p>"  + key +  "</p>"
         }).join("")}
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title">
                              <img src="https://avatars2.githubusercontent.com/u/11876239?s=280&v=4"
                                 style="width:100%; max-width:60px;">
                            </td>
                            <td>
                               Date: ${`${today.getMonth() + 1}. ${today.getDate()}.  ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Patient name: ${name}
                            </td>
                            <td>
                               Project #: ${receiptId}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                                <strong style="font-size:16px; font-weight:700"> Test Performed </strong>
                                <br />
                                Sequence analysis and deletion/duplication testing of the 42 genes listed in the
                                results section below.
                                <br />
                                • Invitae Common Hereditary Cancers Panel (Breast, Gyn, GI)
                            </td>

                      </table>
                   </td>
                </tr>


                <tr class="heading">
                   <td>Gene</td>
                   <td>Variant</td>
                </tr>
                <tr class="item">
                   <td>${gene1}</td>
                   <td>${variant1}</td>
                </tr>
                <tr class="item">
                   <td>${gene2}</td>
                   <td>${variant2}</td>
                </tr>
             </table>
             <br />
             <img src=${`${imageSrc}`}>
             <div id="slideContainer"></div>
             <div id="gene2"></div>

          </div>
          <script>
            (function(){
              var slides = ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5"]

              var str = '<ul>';
              slides.forEach(function(slide) {
                str += '<li>'+ slide + '</li>';
              });
              str += '</ul>';
              document.getElementById("slideContainer").innerHTML = str;

            })();
          </script>
       </body>
    </html>
    `;
};
