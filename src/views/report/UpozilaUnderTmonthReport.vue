<template>
    <div class="UpozilaUnderTmonthReport">
       <b-card title="উপজেলার আওতাধীন গ্রাম আদালতে অভিযোগ গ্রহন ও নিষ্পত্তির ত্রৈমাসিক প্রতিবেদন"> 
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-১৮</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ২৭ (৩) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">উপজেলার আওতাধীন গ্রাম আদালতে অভিযোগ গ্রহন ও নিষ্পত্তির ত্রৈমাসিক প্রতিবেদন</h5>
          </b-col>
        </b-row>
        
        <b-row class="text-center">
          <b-col cols="12">
            <h6 class="align-middle">( বাংলাদেশ গ্রাম আদালত গেজেট, অতিরিক্ত, ফেব্রুয়ারী ১৫, ২০১৬ )</h6>
          </b-col>
        </b-row>
        <div class="crime-place mt-1" >
                    
                    <b-row class="text-center">
                            <b-col cols="12">
                                <h5 class="align-middle">বিরোধের স্থান:</h5>
                            </b-col>
                        </b-row>
                            <br>
                            <b-row cols="1" cols-sm="4" class="justify-content-md-center" >
                                <b-col>
                                    <div class="division">
                                        <div class="label">বিভাগ</div>
                                        <select class="form-select" ref="division" aria-label="Default select example">
                                            <option selected>ঢাকা</option>
                                        </select>
                                    </div>
                                </b-col>
                                <b-col>
                                    <div class="district">
                                        <div class="label">জেলা</div>
                                        <select class="form-select" ref="district" aria-label="Default select example">
                                            <option selected>ঢাকা</option>
                                        </select>
                                    </div>
                                </b-col>
                                <b-col>
                                    <div class="sub-district">
                                        <div class="label">উপজেলা</div>
                                        <select class="form-select" ref="subdistrict" aria-label="Default select example">
                                            <option selected>সাভার</option>
                                        </select>
                                    </div>
                                </b-col>
                                <b-col>
                                    <div class="union">
                                        <div class="label">ইউনিয়ন</div>
                                        <select class="form-select" ref="union" aria-label="Default select example">
                                            <option selected>তেঁতুলঝোড়া</option>
                                        </select>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
        <div class="container-lg">
          
          <b-row class="Date_time text-center mt-3 mb-4" cols-lg="12" cols-sm="">
              <b-col cols=""> 
              </b-col>
              <b-col cols="3"> 
                      <b-form-datepicker id="timepicker-valid" :state="true"  > 
                      </b-form-datepicker>
              </b-col>
              <b-col cols="1"> 
                <strong>থেকে</strong>
              </b-col>
              <b-col cols="3"> 
                      <b-form-datepicker id="timepicker-invalid" :state="true"  > 
                      </b-form-datepicker>
              </b-col>
                <b-col cols="3"> 
                      <button type="button" class="btn btn-success">প্রতিবেদন প্রিন্ট করুন</button>
                </b-col>
          </b-row>

        </div>
        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col" colspan="20" style="text-align:left;">১. গ্রাম আদালত- এর অগ্রগতি ( নোট: এখানে মামলার সংখ্যা বলতে নারী ও পুরুষ কতৃক দাখিলকৃত মামরার সংখ্যা বুঝানো হয়েছে )</th>
            </tr>

          </thead>
          <tbody>
             <tr>
              <th scope="col" rowspan="3">বিরোধের ধরন</th>
              <th scope="col" colspan="2">পূবের অপেক্ষমান মামলার সংখ্যা</th>
              <th scope="col" colspan="2">ইউ.পিতে সরাসরি দায়েরকৃত মামলার সংখ্যা</th>
              <th scope="col" colspan="2">উচ্চ আদালত থেকে প্রেরিত মামলার সংখ্যা</th>
              <th scope="col" colspan="2">মোট মামলার সংখ্যা (১+২+৩)</th>
              <th scope="col" colspan="2">নিষ্পত্তিকৃত মামলার সংখ্যা ( বিধি-৩৩, আপোষ বা শুনানীতে নিষ্পত্তির )</th>
              <th scope="col" colspan="2">বাতিল ও উচ্চ আদালতে প্রেরিত মামলার সংখ্যা</th>
              <th scope="col" colspan="2">মোট নিষ্পত্তিকৃত মামলার সংখ্যা (৫+৬)</th>
              <th scope="col" colspan="2">বতমানে অপেক্ষমান মামলার সংখ্যা (৪-৭)</th>
              <th scope="col" colspan="2">প্রতিবেদনকালীন সময়ে রায় বাস্তবায়নকৃত মামলার সংখ্যা</th>
              <th scope="col" rowspan="3">আদায়কৃত ক্ষতিপুরনের পরিমাণ</th>
            </tr>
            <tr class="table-secondary">
              <th scope="col" colspan="2" >১</th>
              <th scope="col" colspan="2">২</th>
              <th scope="col" colspan="2">৩</th>
              <th scope="col" colspan="2">৪</th>
              <th scope="col" colspan="2">৫</th>
              <th scope="col" colspan="2">৬</th>
              <th scope="col" colspan="2">৭</th>
              <th scope="col" colspan="2">৮</th>
              <th scope="col" colspan="2">৯</th>
            </tr>
            <tr >
              <td>নারী</td>
              <td>পুরুষ</td>
              <td>নারী</td>
              <td>পুরুষ</td>
              <td>নারী</td>
              <td>পুরুষ</td>
              <td>নারী</td>
              <td>পুরুষ</td>
              <td>নারী</td>
              <td>পুরুষ</td>
              <td>নারী</td>
              <td>পুরুষ</td>
              <td>নারী</td>
              <td>পুরুষ</td>
              <td>নারী</td>
              <td>পুরুষ</td>
              <td>নারী</td>
              <td>পুরুষ</td>
              
            </tr>
             <tr >
              <td>দেওয়ানী</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td></td>
              
            </tr>
             <tr >
              <td>ফৌজদারী</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td></td>
            </tr>
             <tr >
              <td>মোট</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td>১০</td>
              <td>১০</td>
              <td>০২</td>
              <td>০৯</td>
              <td></td>
            </tr>
             <tr style="font-weight:700;">
              <td>সর্বমোট</td>
              <td colspan="2">১০</td>
              <td colspan="2">০২</td>
              <td colspan="2">০৯</td>
              <td colspan="2">১০</td>
              <td colspan="2">০২</td>
              <td colspan="2">০৯</td>
              <td colspan="2">১০</td>
              <td colspan="2">১০</td>
              <td colspan="2">০২</td>
              <td colspan="2"></td>
            </tr>
            
           
          </tbody> 
        </table>
        <div class="gadget"> ৩. সাবিক বিষয়ে মন্তব্য (গ্রাম আদালতের উল্লেখযোগ্য কোন অজন, গ্রাম আদালতে কাযকর করার জন্য বিদ্যমান বাধাসমূহ ও অন্যান্য)। প্রয়োজনে অতিরিক্ত কাগজ ব্যবহার করা হইবে।</div>

        <div class="overflow-auto">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router></b-pagination-nav>
        </div>

       </b-card>
    </div>
</template>

<script>
export default {
    methods: {
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      }
    }
}
</script>

<style lang="scss" scoped>
.UpozilaUnderTmonthReport {
  margin: 10px 0px 0px 10px;
}
 .container-lg, .Date_time {
  float: right;

 }
.table{
    width: 100%;
    font-size: 12px;
    text-align:center !important;
    
}
.table ,th, td{
  border: 1px solid rgb(182, 182, 182);

}
.overflow-auto{
    float: right;
}


</style>