<template>
    <div class="RegisterCase">
       <b-card title="মামলার রেজিস্টার রির্পোট"> 
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-১৬</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ২৬ (১) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle"> ইউনিয়ন পরিষদ পত্র প্রদান রেজিস্টার</h5>
          </b-col>
        </b-row>
        
        <b-row class="text-center">
          <b-col cols="12">
            <h6 class="align-middle">( গ্রাম আদালত সংক্রান্ত )</h6>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h4 class="align-middle">( তেতুলঝোড়া ইউনিয়ন পরিষদ )</h4>
          </b-col>
        </b-row>
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
              <th scope="col">ক্রমিক নং</th>
              <th scope="col">মামলা নং</th>
              <th scope="col">পত্র প্রদানের তারিখ</th>
              <th scope="col">প্রাপকের_নাম ও_ঠিকানা</th>
              <th scope="col">পত্র_সংক্ষেপ</th>
              <th scope="col">সংরক্ষিত_ফাইল</th>
              <th scope="col">চিঠির_ধরন (সাধারণ/রেজিস্ট্রী)</th>
              <th scope="col">ডাক_খরচ (টাকা)</th>
              <th scope="col">মারফত</th>
              <th scope="col">পত্র_বাহকের স্বাক্ষর</th>
              <th scope="col">মন্তব্য</th>
            </tr>
            <tr class="table-secondary">
              <th scope="col">১</th>
              <th scope="col">২</th>
              <th scope="col">৩</th>
              <th scope="col">৪</th>
              <th scope="col">৫</th>
              <th scope="col">৬</th>
              <th scope="col">৭</th>
              <th scope="col">৮</th>
              <th scope="col">৯</th>
              <th scope="col">১০</th>
              <th scope="col">১১</th>
            </tr>

          </thead>
          <tbody>
            <tr >
              <td>০১</td>
              <td>১০৫০০</td>
              <td>০২/০৫/২০২২</td>
              <td>আনোয়ার হোসেন <br><span style="font-weight:600">আবেদনকারী</span> <span style="font-weight:500"> <br> গ্রামঃশ্যামপুর </span></td>
              <td> আবুল মিয়ার বাড়িতে পাঠানাে.... </td>
              <td>-</td>
              <td>ডাক যোগে</td>
               <td>১০০ টাকা</td>
               <td>- </td>
               <td>আবুল মিয়া</td>
               <td>-</td>
            </tr>
             <tr >
              <td>০১</td>
              <td>১০৫০০</td>
              <td>০২/০৫/২০২২</td>
               <td>আনোয়ার হোসেন <br><span style="font-weight:600">আবেদনকারী</span> <span style="font-weight:500"> <br> গ্রামঃশ্যামপুর </span></td>
              <td> আবুল মিয়ার বাড়িতে পাঠানাে.... </td>
              <td>-</td>
              <td>ডাক যোগে</td>
               <td>১০০ টাকা</td>
               <td>- </td>
               <td>আবুল মিয়া</td>
               <td>-</td>
            </tr>
             <tr >
              <td>০১</td>
              <td>১০৫০০</td>
              <td>০২/০৫/২০২২</td>
              <td>আনোয়ার হোসেন <br><span style="font-weight:600">আবেদনকারী</span> <span style="font-weight:500"> <br> গ্রামঃশ্যামপুর </span></td>
              <td> আবুল মিয়ার বাড়িতে পাঠানাে.... </td>
              <td>-</td>
              <td>ডাক যোগে</td>
               <td>১০০ টাকা</td>
               <td>- </td>
               <td>আবুল মিয়া</td>
               <td>-</td>
            </tr>
             <tr >
              <td>০১</td>
              <td>১০৫০০</td>
              <td>০২/০৫/২০২২</td>
             <td>আনোয়ার হোসেন <br><span style="font-weight:600">আবেদনকারী</span> <span style="font-weight:500"> <br> গ্রামঃশ্যামপুর </span></td>
              <td> আবুল মিয়ার বাড়িতে পাঠানাে.... </td>
              <td>-</td>
              <td>ডাক যোগে</td>
               <td>১০০ টাকা</td>
               <td>- </td>
               <td>আবুল মিয়া</td>
               <td>-</td>
            </tr>
             <tr >
              <td>০১</td>
              <td>১০৫০০</td>
              <td>০২/০৫/২০২২</td>
             <td>আনোয়ার হোসেন <br><span style="font-weight:600">আবেদনকারী</span> <span style="font-weight:500"> <br> গ্রামঃশ্যামপুর </span></td>
              <td> আবুল মিয়ার বাড়িতে পাঠানাে.... </td>
              <td>-</td>
              <td>ডাক যোগে</td>
               <td>১০০ টাকা</td>
               <td>- </td>
               <td>আবুল মিয়া</td>
               <td>-</td>
            </tr>
             <tr >
              <td>০১</td>
              <td>১০৫০০</td>
              <td>০২/০৫/২০২২</td>
              <td>আনোয়ার হোসেন <br><span style="font-weight:600">আবেদনকারী</span> <span style="font-weight:500"> <br> গ্রামঃশ্যামপুর </span></td>
              <td> আবুল মিয়ার বাড়িতে পাঠানাে.... </td>
              <td>-</td>
              <td>ডাক যোগে</td>
               <td>১০০ টাকা</td>
               <td>- </td>
               <td>আবুল মিয়া</td>
               <td>-</td>
            </tr>
             <tr >
              <td>০১</td>
              <td>১০৫০০</td>
              <td>০২/০৫/২০২২</td>
              <td>আনোয়ার হোসেন <br><span style="font-weight:600">আবেদনকারী</span> <span style="font-weight:500"> <br> গ্রামঃশ্যামপুর </span></td>
              <td> আবুল মিয়ার বাড়িতে পাঠানাে.... </td>
              <td>-</td>
              <td>ডাক যোগে</td>
               <td>১০০ টাকা</td>
               <td>- </td>
               <td>আবুল মিয়া</td>
               <td>-</td>
            </tr>
             <tr >
              <td>০১</td>
              <td>১০৫০০</td>
              <td>০২/০৫/২০২২</td>
              <td>আনোয়ার হোসেন <br><span style="font-weight:600">আবেদনকারী</span> <span style="font-weight:500"> <br> গ্রামঃশ্যামপুর </span></td>
              <td> আবুল মিয়ার বাড়িতে পাঠানাে.... </td>
              <td>-</td>
              <td>ডাক যোগে</td>
               <td>১০০ টাকা</td>
               <td>- </td>
               <td>আবুল মিয়া</td>
               <td>-</td>
            </tr>
           
          </tbody> 
        </table>
        <div class="gadget">  ১৪৪০ , বাংলাদেশ গেজেট, অতিরিক্ত, ফেব্রুয়ারী ১৫, ২০১৬</div>

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
.RegisterCase {
  margin: 10px 0px 0px 10px;
}
 .container-lg, .Date_time {
  float: right;

 }
.table{
    width: 100%;
    font-size: 12px;
    text-align:center !important;
    border: 1px solid rgb(182, 182, 182);
}
.overflow-auto{
    float: right;
}


</style>