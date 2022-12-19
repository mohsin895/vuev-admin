<template>
    <div >
        <b-row>
            <b-col>A</b-col>
            <b-col>B</b-col>
        </b-row>
        <b-row>
            <b-col>
                
                    <h5>রেজিস্ট্রারকৃত এসএমএস প্রদানের মামলা সমূহ:</h5>
                        <table class="table table-borderless caption-top">
                                <thead>
                                    <tr>
                                    <th scope="col">মামলার_নম্বর: </th>
                                    <th scope="col">মামলা_গ্রহনের_তারিখ: </th>
                                    <th scope="col">আবেদনকারীর_নাম: </th>
                                    <th scope="col">এসএমএস_প্রদানের_তারিখ:</th>
                                    <th scope="col">অ্যাকশন</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-success">
                                        <th scope="row">10000</th>
                                        <td>01/04/2022</td>
                                        <td>আনোয়ার হোসেন</td>
                                        <td>06/04/2022</td>
                                        <td><a href="#" v-b-modal.modal-2> <icon name="eye" size="20px"/></a> </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">10001</th>
                                        <td>01/04/2022</td>
                                        <td>আহসান হাবীব</td>
                                        <td>06/04/2022</td>
                                        <td><a href="#" v-b-modal.modal-2> <icon name="eye" size="20px"/></a> </td>
                                    </tr>
                                    <tr class="table-success">
                                        <th scope="row">10002</th>
                                        <td>01/04/2022</td>
                                        <td>হৃদয় হাসান</td>
                                        <td>06/04/2022</td>
                                        <td><a href="#" v-b-modal.modal-2> <icon name="eye" size="20px"/></a> </td>
                                    </tr>
                                </tbody>
                            </table>
            </b-col>
             <b-col>
                
                        <p>ফরম-১</p>
                        <p>[বিধি ৩ দ্রষ্টব্য]</p>
                        <h5>আবেদনকারীর প্রতি সমন</h5>
                        <button type="button" class="btn btn-success">Submit</button>
                        <input  placeholder="Search Case No" />
                        <br> 
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">মামলার_নম্বর: </th>
                            <th scope="col">মামলা_গ্রহনের_তারিখ: </th>
                            <th scope="col">আবেদনকারীর_নাম: </th>
                            <th scope="col">প্রতিবাদীর_নাম: </th>
                            <th scope="col">স্বাক্ষীগণের_নাম: </th>
                            <th scope="col">বিরোদের_বিষয়বস্তু:</th>
                            <th scope="col">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-primary"> 
                                <th scope="row">10000</th>
                                <td>01/04/2022</td>
                                <td>আনোয়ার হোসেন</td>
                                <td>জামন হোসেন, কাকরী</td>
                                <td>জসিম হোসেন</td>
                                <td>জমি নিয়ে</td>
                                <td><a href="#" v-b-modal.modal-1> <icon name="eye" size="20px"/></a> </td>
                            </tr>
                             <tr>
                                <th scope="row">10000</th>
                                <td>01/04/2022</td>
                                <td>তাতী মিয়া</td>
                                <td>বেপারী হোসেন, আমনী</td>
                                <td>জসিম হোসেন</td>
                                <td>জমি নিয়ে</td>
                                <td><a href="#" v-b-modal.modal-1> <icon name="eye" size="20px"/></a> </td>
                            </tr>
                             <tr class="table-primary">
                                <th scope="row">10000</th>
                                <td>01/04/2022</td>
                                <td>সুমন হোসেন</td>
                                <td>গগন মিয়, রুপারী</td>
                                <td>জসিম হোসেন</td>
                                <td>মারামরি নিয়ে</td>
                                <td><a href="#" v-b-modal.modal-1> <icon name="eye" size="20px"/></a> </td>
                            </tr>
                             <tr>
                                <th scope="row">10000</th>
                                <td>01/04/2022</td>
                                <td>দেলোয়ার হোসেন</td>
                                <td>জামন হোসেন, গহজকগহ</td>
                                <td>হগগহক হোসেন</td>
                                <td>জামাই বউ</td>
                                <td><a href="#" v-b-modal.modal-1> <icon name="eye" size="20px"/></a> </td>
                            </tr>
                             <tr class="table-primary">
                                <th scope="row">10000</th>
                                <td>01/04/2022</td>
                                <td>গহুগপি হোসেন</td>
                                <td>জামন হোসেন, কাকরী</td>
                                <td>জসিম হোসেন</td>
                                <td>গতগ নিয়ে</td>
                                <td><a href="#" v-b-modal.modal-1> <icon name="eye" size="20px"/></a> </td>
                            </tr>
                            <tr>
                                <th scope="row">10001</th>
                                <td>01/04/2022</td>
                                <td>আহসান হাবীব, মামুন মিয়া</td>
                                <td>জামন হোসেন</td>
                                <td>জগহকগহজ</td>
                                <td>জমি নিয়ে</td>
                                <td><a href="#" v-b-modal.modal-1> <icon name="eye" size="20px"/></a> </td>
                            </tr>
                            <tr class="table-primary">
                                <th scope="row">10002</th>
                                <td>01/04/2022</td>
                                <td>হৃদয় হাসান</td>
                                <td>ড়গগহড়তগ হোসেন</td>
                                <td>জসিম হোসেন</td>
                                <td>জমি নিয়ে</td>
                                <td><a href="#" v-b-modal.modal-1> <icon name="eye" size="20px"/></a> </td>
                            </tr>
                        </tbody>
                    </table>
                
            </b-col>
        </b-row>


        <!-- Modal 01 section start hare -->

        <b-modal id="modal-1" title="ফরম-১" size="xl" margin="center">
             <!-- select option -->
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-center">ফরম-১</p>
                        </b-col>
                </b-row>
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-middle">[বিধি ৩ দ্রষ্টব্য]</p>
                        </b-col>
                </b-row>
                <b-row class="text-center">
                        <b-col cols="12">
                            <select class="align-middle" name="select_persons" id="">
                                <option action="#">আবেদনকারীর প্রতি সমন</option>
                                <option action="#">প্রতিবাদির প্রতি সমন</option>
                                <option action="#">সাক্ষীর প্রতি সমন</option>
                            </select>
                        </b-col>
                </b-row>
                
            <br><br>
             <!-- crime place -->
             <div class="crime-place">
                        <label for=""><strong>বিরোধের স্থান:</strong></label> <br> <br>
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
                     <!-- applicants info -->
                     <br> 
                     <p> বরাবর </p> 
                     <p>আবেদরকারী,</p> <span> মো: আবুল হাসেম,  </span> <span> ০১৭৬৫৮৬৮৯৫১ </span> <br> <br>
                     <b-row cols="1" cols-sm="3" class="justify-content-md-center" >
                        <b-col col lg="3">
                            <span> যেহেতু   </span> 
                            <span> 
                                <select class=""> 
                                    <option selected> ফৌজদারী</option>
                                </select>
                            </span>
                        </b-col>
                        <b-col col lg="2">
                            <span>এর</span> 
                            <span> 
                                <select class=""> 
                                    <option selected> জমি</option>
                                </select>
                            </span>
                        </b-col>
                        <b-col col lg="7"  >
                            <span>সংক্রান্ত অভিযোগ/দাবী সম্পর্কে তাহার আবেদনপত্রের জবাব দেওয়ার</span>
                        </b-col>

                     </b-row> <br>
                    <b-row cols="1" cols-sm="6" >
                        <b-col col lg="6">
                            <span>জন্য আপনার উপস্তিতি প্রয়োজন; সেইহেতু, এতদ্বারা আপনাকে</span>
                        </b-col>
                        <b-col col lg="4">
                            <b-form-datepicker id="datepicker-valid" :state="true" class="date"></b-form-datepicker>
                            <span>তারিখ </span> 
                        </b-col>
                        <b-col col lg="2">
                            <b-form-timepicker id="timepicker-valid" :state="true" class="time" ></b-form-timepicker>
                            <span>টায় </span>
                        </b-col>
                    </b-row> 
                     <b-row cols="1" cols-sm="1" >
                        <b-col>
                            <span>সময় আমার নিকট হাজির হইতে নিদেশ দেওয়া গেল।</span>
                        </b-col>
                    </b-row> <br>
                    <b-row class="text-center">
                        <b-col cols="12">
                            <button type="button" class="btn btn-success " > এসএমএস প্রেরন করুন </button>
                        </b-col>
                    </b-row>

        </b-modal>

         <!-- Modal 02 section start hare -->
        <b-modal id="modal-2" title="ফরম-১" size="xl" margin="center">
        
             <!-- select option -->
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-center">ফরম-১</p>
                        </b-col>
                </b-row>
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-middle">[বিধি ৩ দ্রষ্টব্য]</p>
                        </b-col>
                </b-row>
                <b-row class="text-center">
                        <b-col cols="12">
                            <select class="align-middle" name="select_persons" id="">
                                <option action="#">আবেদনকারীর প্রতি সমন</option>
                                <option action="#">প্রতিবাদির প্রতি সমন</option>
                                <option action="#">সাক্ষীর প্রতি সমন</option>
                            </select>
                        </b-col>
                </b-row>
                
            <br><br>
             <!-- crime place -->
             <div class="crime-place">
                        <label for=""><strong>বিরোধের স্থান:</strong></label> <br> <br>
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
                     <!-- applicants info -->
                     <br> 
                     <p> বরাবর </p> 
                     <p>আবেদরকারী,</p> <span> মো: আবুল হাসেম,  </span> <span> ০১৭৬৫৮৬৮৯৫১ </span> <br> <br>
                     <b-row cols="1" cols-sm="3" class="justify-content-md-center" >
                        <b-col col lg="3">
                            <span> যেহেতু   </span> 
                            <span> 
                                <select class=""> 
                                    <option selected> ফৌজদারী</option>
                                </select>
                            </span>
                        </b-col>
                        <b-col col lg="2">
                            <span>এর</span> 
                            <span> 
                                <select class=""> 
                                    <option selected> জমি</option>
                                </select>
                            </span>
                        </b-col>
                        <b-col col lg="7"  >
                            <span> সংক্রান্ত অভিযোগ/দাবী সম্পর্কে তাহার আবেদনপত্রের জবাব দেওয়ার</span>
                        </b-col>

                     </b-row> <br>
                    <b-row cols="1" cols-sm="6" >
                        <b-col col lg="6">
                            <span> জন্য আপনার উপস্তিতি প্রয়োজন; সেইহেতু, এতদ্বারা আপনাকে</span>
                        </b-col>
                        <b-col col lg="4">
                            <b-form-datepicker id="datepicker-valid" :state="true" class="date"></b-form-datepicker>
                            <span> তারিখ </span> 
                        </b-col>
                        <b-col col lg="2">
                            <b-form-timepicker id="timepicker-valid" :state="true" class="time" ></b-form-timepicker>
                            <span> টার </span>
                        </b-col>
                    </b-row> 
                     <b-row cols="1" cols-sm="1" >
                        <b-col>
                            <span> সময় আমার নিকট হাজির হইতে নিদেশ দেওয়া গেল।</span>
                        </b-col>
                    </b-row> <br> <br> <br> <br> <br> <br> <br>
                    <b-row cols="1" cols-sm="2" class="text-center"> 
                        <b-col > 
                            <div class="underline"> </div> <br>
                            <p>তারিখ: ১০/১২/২০২১ </p>
                            <p>সীলমোহর</p>
                        </b-col>
                        <b-col> 
                            <div class="underline"> </div> <br>
                            <p>গ্রাম আদালত/ইউনিয়ন পরিষদ</p>
                            <p>এর চেয়ারম্যানের স্বাক্ষর</p>
                        </b-col>
                        
                        
                    </b-row>
                    <div class="printfile">
                    <a href="#" > <icon name="print" size="20px"/></a>
                    </div>


        </b-modal>


    </div>
   
</template>

<script>
import update from '@/components/application/update.vue';
export default {
    components: {
        update
    }
   
} 
</script>

<style lang="scss" scoped>

//  //register sms prodan case style hare 
// .container-sm .table{
//     width: 560px;
//     font-size: 12px;
//     background-color: rgb(243, 243, 243);
// }
// .table thead{
//     background-color: rgb(219, 219, 219);
// }
// .container-sm{
//     float:left;
//     width: 650px;
//     background-color: rgb(243, 243, 243);
// }
// // applicants,oposition,witness  case style hare 

// .container-lg{
//     height: auto;
//     width:980px;
//     font-size: 14px;
//     background-color: rgb(243, 243, 243);
//     margin-left: 10px;
//     float: right;
// }
// .container-lg input{
//     margin-top: -40px;
//     margin-right: 100px;
//     padding: 8.6px;
//     background-color: rgb(219, 219, 219);
//     border: 0px;
//     color: #000;
//     font-size: 1.1em;
//     float: right;
// }
// .container-lg button{
//     float: right;
//     margin-top: -40px;
// }
// // crime-place modal start 
// .date{
//     width: 200px;
//     float: none;
// }
// .time{
//     width: 150px;
//     float: none;
// }
// span{
//     font-size: 18px;
// }
// p{
//     font-size: 18px;
// }
// .underline{
//     width: 250px;
//     height: 1px;
//     background-color: gray;
//     margin: auto;
    
// }
// .printfile{
//     width: 50px;
//     height: 50px;
//     background-color: rgb(224, 224, 224);
//     color: rgb(0, 97, 0);
//     text-align:center;
//     font-size: 25px;
//     padding:5px;
//     float: right;
// }

</style>