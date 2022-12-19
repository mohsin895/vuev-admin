<template>
    <div>
    <div class="layout">
        <div ref="leftNav" class="left-nav">
            <div class="logo">
                <img draggable="false" src="@/assets/images/logo.png" alt="">
            </div>
            <div class="menus">
                <!-- single menus -->
            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(1)">
                <div class="menu">
                    <router-link :to="{name:'Dashboard'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="tachometer-alt" size="20px"/>
                            </div>
                            <div class="menu-text">
                                ড্যাশবোর্ড
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(4)">
                <div class="menu">
                    <router-link :to="{name:'Applications'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="th-large" size="20px"/>
                            </div>
                            <div class="menu-text">
                                অ্যাপ্লিকেশনস
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(7)">
                <div class="menu">
                    <router-link :to="{name:'CaseSummon'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="comment-alt" size="20px"/>
                            </div>
                            <div class="menu-text">
                                মামলার প্রতি সমন
                            </div>
                        </div>
                    </router-link>
                </div>

            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(14)">
                <div class="menu">
                    <router-link :to="{name:'CrimeRegister'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="book" size="20px"/>
                            </div>
                            <div class="menu-text">
                                মামলার রেজিস্টার
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(11)">
                <div class="menu">
                    <router-link :to="{name:'CrimeAttendance'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="rss-square" size="20px"/>
                            </div>
                            <div class="menu-text">
                                মামলার হাজিরা
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(16)">
                <div class="menu">
                    <router-link :to="{name:'MemberNominationOrder'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="clock" size="20px"/>
                            </div>
                            <div class="menu-text">
                                সদস্য মনোনয়ন নির্দেশনামা
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(67)">
                <div class="menu">
                    <router-link :to="{name:'MemberNominationForm'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="list-alt" size="20px"/>
                            </div>
                            <div class="menu-text">
                                সদস্য মনোনয়ন ফরম
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(18)">
                <div class="menu">
                    <router-link :to="{name:'MemberAttendanceRequest'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="creative-commons-by" size="20px"/>
                            </div>
                            <div class="menu-text">
                                সদস্য উপস্থিতির অনুরোধ
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(20)">
                <div class="menu">
                    <router-link :to="{name:'CrimeOrder'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="exclamation-circle" size="20px"/>
                            </div>
                            <div class="menu-text">
                                মামলার আদেশনামা
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(23)">            
                <div class="menu">
                    <router-link :to="{name:'MutualSolution'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="fan" size="20px"/>
                            </div>
                            <div class="menu-text">
                                আপোষনামা
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(26)">
                <div class="menu">
                    <router-link :to="{name:'DegreeOrOrderForm'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="file-upload" size="20px"/>
                            </div>
                            <div class="menu-text">
                                ডিগ্রী বা আদেশের ফরম
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <slot v-if="permissionList.includes(29)">
                <div class="menu">
                    <router-link :to="{name:'SendToHigherCourt'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="share-square" size="20px"/>
                            </div>
                            <div class="menu-text">
                                উচ্চ আদালতে পাঠানো মামলা
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>

            <!-- <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(31)">
                <div class="menu">
                    <router-link :to="{name:'SendToLocalCourt'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="share-square" size="20px"/>
                            </div>
                            <div class="menu-text">
                                ফৌজদারী আদালতে পাঠানো মামলা
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>
 -->
            <slot v-if="permissionList.length>0">
            <slot v-if="permissionList.includes(33)">
                <div class="menu">
                    <router-link :to="{name:'CrimeSlip'}">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon name="file-alt" size="20px"/>
                            </div>
                            <div class="menu-text">
                                মামলার স্লিপ ও জরিমানা 
                            </div>
                        </div>
                    </router-link>
                </div>
            </slot></slot>
                

                <!-- <div class="menu" 
                v-for="(menu,index) in menus" 
                :key="index"
                >
                    <router-link :to="menu.route">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <icon :name="menu.icon" size="20px"/>
                            </div>
                            <div class="menu-text">
                                {{menu.menuName}}
                            </div>
                        </div>
                    </router-link>
                </div> -->
                  <!-- collapse routes -->
                <div class="collaplse-menu">
                    <a-collapse
                        expand-icon-position="right"
                        :bordered="false"
                    >
                <slot v-if="permissionList.length>0">
                <slot v-if="permissionList.includes(35)">
                        <a-collapse-panel 
                        header="রিপোর্ট"
                        :style="customStyle"
                        key="1"
                        >
                            <a-icon  slot="extra" type="info-circle" />
                            <ul class="pointer-margin">
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(36)">
                                <li>
                                    <div class="point-route-wrapper mt-1">
                                        <div class="point-wrapper">
                                            <div class="li-bulet-point"></div>
                                        </div>
                                        <div class="router-text">
                                          <router-link :to="{name:'RegisterCaseReport'}">  মামলার রেজিস্টার </router-link> 
                                        </div>
                                    </div>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(37)">
                                <li>
                                    <div class="point-route-wrapper mt-1">
                                        <div class="point-wrapper">
                                            <div class="li-bulet-point"></div>
                                        </div>
                                        <div class="router-text">
                                           <router-link :to="{name:'DegriOrOrderRegister'}"> ডিগ্ৰী এবং আদেশের রেজিস্টার </router-link> 
                                        </div>
                                    </div>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(38)">
                                <li>
                                    <div class="point-route-wrapper mt-1">
                                        <div class="point-wrapper">
                                            <div class="li-bulet-point"></div>
                                        </div>
                                        <div class="router-text">
                                          <router-link :to="{name:'LossAndOrderRegister'}">ক্ষতিপূরণের অর্থ লেনদেন রেজিস্টার</router-link>    
                                        </div>
                                    </div>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(66)">
                                <li>
                                    <div class="point-route-wrapper">
                                        <div class="point-wrapper">
                                            <div class="li-bulet-point"></div>
                                        </div>
                                        <div class="router-text">
                                             <router-link :to="{name:'FeesOrFineRegister'}" >ফিস বা জরিমানা রেজিস্টার</router-link>   
                                        </div>
                                    </div>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(39)">
                                <li>
                                    <div class="point-route-wrapper">
                                        <div class="point-wrapper">
                                            <div class="li-bulet-point"></div>
                                        </div>
                                        <div class="router-text">
                                           <router-link :to="{name:'PatroProdanRegister'}">পত্র প্রদান রেজিস্টার </router-link>
                                        </div>
                                    </div>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(40)">
                                <li>
                                    <div class="point-route-wrapper">
                                        <div class="point-wrapper">
                                            <div class="li-bulet-point"></div>
                                        </div>
                                        <div class="router-text">
                                            <router-link :to="{name:'ComplaneAceptAndTmonthReport'}">অভিযোগ গ্রহণ ও নিষ্পত্তির ত্রৈমাসিক প্রতিবেদন</router-link> 
                                        </div>
                                    </div>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(41)">
                                <li>
                                    <div class="point-route-wrapper">
                                        <div class="point-wrapper">
                                            <div class="li-bulet-point"></div>
                                        </div>
                                        <div class="router-text">
                                           <router-link :to="{name:'UpazilaQuarterlyReport'}">উপজেলা আওতাধীন ত্রৈমাসিক প্রতিবেদন</router-link> 
                                        </div>
                                    </div>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(42)">
                                <li>
                                    <div class="point-route-wrapper">
                                        <div class="point-wrapper">
                                            <div class="li-bulet-point"></div>
                                        </div>
                                        <div class="router-text">
                                            <router-link :to="{name:'zilaQuarterlyReport'}">জেলার আওতাধীন ত্রৈমাসিক প্রতিবেদন</router-link>
                                        </div>
                                    </div>
                                </li>
                            </slot></slot>
                            </ul>
                        </a-collapse-panel>
                    </slot></slot>
                    <slot v-if="permissionList.length>0">
                    <slot v-if="permissionList.includes(43)">
                        <a-collapse-panel 
                        header="সেটিংস"
                        :style="customStyle"
                        key="2"
                        >
                            <a-icon slot="extra" type="setting" />
                            <ul>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(44)">
                                <!-- <li>
                                    <router-link to="/slider-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                মিডিয়া
                                            </div>
                                        </div>
                                    </router-link>
                                </li> -->
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(45)">
                                <li>
                                    <router-link to="/union-members">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                ইউনিয়ন মেম্বার তালিকা
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </slot></slot>
                            
                            <!-- <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(49)">
                                <li>
                                    <router-link to="/tno-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                থানা নির্বাহী কর্মকর্তা তালিকা
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(53)">
                                <li>
                                    <router-link to="/deputy-commissioner-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                জেলা প্রশাসক তালিকা
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </slot></slot> -->
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(57)">
                                <li>
                                    <router-link to="/staff-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                কর্মী তালিকা
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </slot></slot>
                            <slot v-if="permissionList.length>0">
                            <slot v-if="permissionList.includes(61)">
                                <li>
                                    <router-link to="/role-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                ভূমিকা তালিকা
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </slot></slot>

                                <li>
                                    <router-link to="/general-setting">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                সাধারণ সেটিংস
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                        </ul>
                        </a-collapse-panel>
                    </slot></slot>

                    <slot >
                        <a-collapse-panel 
                        header="ওয়েবসাইট সেটিংস"
                        :style="customStyle"
                        key="3"
                        >
                            <a-icon slot="extra" type="setting" />
                            <ul>
                            
                                <li>
                                    <router-link to="/slider-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                স্লাইডার
                                            </div>
                                        </div>
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/notice-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                নোটিশ
                                            </div>
                                        </div>
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/dewyani-service">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                দেওয়ানী সেবা
                                            </div>
                                        </div>
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/fouzdari-service">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                ফৌজদারি সেবা
                                            </div>
                                        </div>
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/laws-form-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                               আইন ফর্ম
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            

                                <li>
                                    <router-link to="/laws-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                              আইন তালিকা
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                                

                                <li>
                                    <router-link to="/media-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                মিডিয়া
                                            </div>
                                        </div>
                                    </router-link>
                                </li> 

                                <li>
                                    <router-link to="/general-question">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                সাধারণ প্রশ্ন
                                            </div>
                                        </div>
                                    </router-link>
                                </li> 
                                <li>
                                    <router-link to="/gadget-list">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                গ্যাজেট তালিকা
                                            </div>
                                        </div>
                                    </router-link>
                                </li> 

                                <li>
                                    <router-link to="/fees-text">
                                        <div class="point-route-wrapper">
                                            <div class="point-wrapper">
                                                <div class="li-bulet-point"></div>
                                            </div>
                                            <div class="router-text">
                                                ফি টেক্সট
                                            </div>
                                        </div>
                                    </router-link>
                                </li> 

                            
                            </ul>
                        </a-collapse-panel>
                    </slot></slot>
                    </a-collapse>

                <div class="menu" >
                    <a href="#" @click="logoutFunction">
                        <div class="menut-item">
                            <div class="prefix-icon">
                                <b-icon icon="power" aria-hidden="true"></b-icon>
                            </div>
                            <div class="menu-text">
                                লগ আউট
                            </div>
                        </div>
                    </a>
                </div>
                </div>
            </div>
        </div>
        <div ref="rightBody" class="right-body">
            <div class="sticky-head">
                <div class="head-top">
                    <P>BANGLADESH VILLAGE COURT</P>
                    <h5> তেঁতুলঝোড়া ইউনিয়ন পরিষদ</h5>
                </div>
                <!-- <div class="head-bottom">
                    <button 
                    class="menu-btn btn btn-outline-primary" 
                    @click="myFunc()"
                    >
                        <b-icon icon="list" color="white" scale="1.5"/>
                    </button>
                    <div class="essential-icons">
                        <b-icon icon="bell" scale="1.5"/>
                        <b-icon icon="person-fill" color="white" scale="1.5"/>
                    </div>
                </div> -->

                <div class="head-bottom d-flex flex-row-reverse mr-2">
                    <div class="essential-icons">
                      <b-dropdown  :text="$store.state.userInfo.name"  variant="none" class="m-2 mr-2" no-caret>
                        <template #button-content>
                            <b-icon icon="bell" color="white" scale="1.5"/>
                            <sup class="bell-text" >5</sup>
                        </template>
                        <b-dropdown-item href="#"></b-dropdown-item>
                       
                      </b-dropdown>

                      <b-dropdown  :text="$store.state.userInfo.name"  variant="none" class="m-2 mr-2" no-caret>
                        <template #button-content>
                            <span class="h6 text-light">
                                {{$store.state.userInfo.name+'  '}}
                            </span> 
                            <!-- <b-icon icon="person-circle" color="white" scale="1.5"/> -->
                            <img :src="$store.state.userInfo.avatar" height="40" width="40" style="border-radius:50%; border:2px solid white;">
                        </template>
                        <b-dropdown-item href="#" v-b-modal.profile-edit-form @click="getProfileInfo()">প্রোফাইল</b-dropdown-item>
                        <b-dropdown-item href="#" v-b-modal.password-edit-form>পাসওয়ার্ড পরিবর্তন</b-dropdown-item>
                        <b-dropdown-item href="#" @click="logoutFunction"> লগ আউট</b-dropdown-item>
                      </b-dropdown>
                  </div>
                </div>
            </div>
            <div class="gram-adalot-container">
                <!-- all child route's view -->
                <router-view/>
            </div>
        </div>
    </div>

<b-modal id="profile-edit-form" title="প্রোফাইল হালনাগাদ" size="xl" ok-only ok-variant="secondary" ok-title="Close">
           <b-row>
               <b-col>
                   <b-row>
                    <b-col>
                        <img :src="photo" height="70" width="70">
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                       

                        <b-form-group  prepend="ছবি" label-cols-sm="2">
                            <b-form-file id="file-default" ref="photo" accept="image/*"  @change="loadPhoto"></b-form-file>
                          </b-form-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="নামঃ" class="mt-3">
                            <b-form-input v-model="name"></b-form-input>
                        </b-input-group>

                    </b-col>
                   </b-row>
                   
                   
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ফোন" class="mt-3">
                            <b-form-input type="text" v-model="phone"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ইমেইল" class="mt-3">
                            <b-form-input v-model="email"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ঠিকানা" class="mt-3">
                            <b-form-textarea rows="4" v-model="address"></b-form-textarea>
                        </b-input-group>
                    </b-col>
                   </b-row>
                  
                   <b-row class="mt-2">
                       <b-col>
                               
                       </b-col>
                       <b-col class="d-flex flex-row-reverse">
                            
                        <slot v-if="$store.state.userInfo.permissions.includes(59)">
                             <b-button variant="success" class="ml-2" @click="updateProfileInfo">আপডেট করুন</b-button>
                         </slot>
                         <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                       </b-col>
                   </b-row>
               </b-col>
           </b-row>
          </b-modal>

<b-modal id="password-edit-form" title="প্রোফাইল হালনাগাদ" size="xl" ok-only ok-variant="secondary" ok-title="Close">
   <b-row>
       <b-col>
          
           
           <b-row>
            <b-col>
                <b-input-group prepend="পাসওয়ার্ড" class="mt-3">
                    <b-form-input type="password"  v-model="password"></b-form-input>
                </b-input-group>
            </b-col>
           </b-row>
           <b-row>
            <b-col>
                <b-input-group prepend="পাসওয়ার্ড নিশ্চিত করুন" class="mt-3">
                    <b-form-input type="password" v-model="conPassword"></b-form-input>
                </b-input-group>
            </b-col>
           </b-row>
         
           <b-row class="mt-2">
               <b-col>
                       
               </b-col>
               <b-col class="d-flex flex-row-reverse">
                    
                <slot v-if="$store.state.userInfo.permissions.includes(59)">
                     <b-button variant="success" class="ml-2" @click="changePassword">পরিবর্তন করুন</b-button>
                 </slot>
                 <b-button variant="danger" @click="resetPasswordForm">মুছুন</b-button>
               </b-col>
           </b-row>
       </b-col>
   </b-row>
  </b-modal>

</div>
</template>

<script>
export default {
    data() {
        return {
            password:null,
            conPassword:null,
            role:null,
            email:null,
            phone:null,
            photo:null,
            address:null,
            permissionList:[],
            activeKey: '1',
            expandIconPosition: 'right',
            customStyle:'background: #474141;border-bottom: 1px solid #837f7f;\
            overflow: hidden;color: white !important;',
            menus: [
                {
                    icon: 'tachometer-alt',
                    menuName: 'ড্যাশবোর্ড',
                    route: 'dashboard'
                },
                {
                    icon: 'th-large',
                    menuName: 'অ্যাপ্লিকেশনস',
                    route: 'applications'
                },
                {
                    icon: 'comment-alt',
                    menuName: 'মামলার প্রতি সমন',
                    route: 'case-summon'
                },
                {
                    icon: 'rss-square',
                    menuName: 'মামলার হাজিরা',
                    route: 'crime-attendance'
                },
                {
                    icon: 'book',
                    menuName: 'মামলার রেজিস্টার',
                    route: 'crime-register'
                }, 
                {
                    icon: 'clock',
                    menuName: 'সদস্য মনোনয়ন নির্দেশনামা',
                    route: 'member-nomination-order'
                },
                {
                    icon: 'list-alt',
                    menuName: 'সদস্য মনোনয়ন ফরম',
                    route: 'member-nomination-form'
                },
                {
                    icon: 'creative-commons-by',
                    menuName: 'সদস্য উপস্থিতির অনুরোধ',
                    route: 'member-attendance-request'
                },
                {
                    icon: 'exclamation-circle',
                    menuName: 'মামলার আদেশনামা',
                    route: 'crime-order'
                },
                {
                    icon: 'fan',
                    menuName: 'আপোষনামা',
                    route: 'mutual-solution'
                },
                {
                    icon: 'file-upload',
                    menuName: 'ডিগ্রী বা আদেশের ফরম',
                    route: 'degre-or-order-form'
                },
                {
                    icon: 'share-square',
                    menuName: 'উচ্চ আদালতে পাঠানো মামলা',
                    route: 'send-to-higher-court'
                },
                {
                    icon: 'share-square',
                    menuName: 'ফৌজদারী আদালতে পাঠানো মামলা',
                    route: 'send-to-local-court'
                },
                {
                    icon: 'file-alt',
                    menuName: 'মামলার স্লিপ',
                    route: 'crime-slip'
                },
            ],
            leftNav: true
        }
    },
    beforeMount(){
        this.getUserPermissionList();
    },
    mounted() {
        addEventListener('resize', () => {
            let width = window.innerWidth;
            if (width < 768) {
                if (this.leftNav) {
                    this.removeLeftNav();
                    this.leftNav = false;
                }
            } else {
                if (this.leftNav === false) {
                    this.addLeftNav();
                    this.leftNav = true;
                }
            }
        }) 
    },
    methods: {
    resetPasswordForm(){
            this.password=null;
            this.conPassword=null;
      },
      passwordFormValidation(){
        if(this.password!=null && this.conPassword!=null){
            if(this.password==this.conPassword){
                return true;
            }
            else{
                 this.$toaster.warning("Password Doesn't Match.");
                 return false;
            }
        }
        else{
            if(this.password==null){
                 this.$toaster.warning("Please Enter Password First.");
                 return false;
            }
            if(this.conPassword==null){
                 this.$toaster.warning("Please Enter Confirm Password.");
                 return false;
            }
        }
      },
        async changePassword(){

            if(this.passwordFormValidation()){

                let token=window.localStorage.getItem("token");
                let config = {
                           headers: {
                              'Authorization': 'Bearer '+token,
                              'Content-Type': 'multipart/form-data'
                          }   
                      };
                
                let url="staff/settings/profile/password/change";

                let formData=new FormData();


                formData.append("password",this.password);

                await this.$http.post(url,formData,config)
                 .then(response=>{
                    if(response.data.msgFlag==true){
                        this.$toaster.success(response.data.msg);
                        // location.reload();
                        this.resetPasswordForm();
                    }
                    if(response.data.errMsgFlag==true)
                        this.$toaster.warning(response.data.errMsg);
                 })
                 .catch(error=>{console.dir(error)})
                 .finally();
             }
        },
        async updateProfileInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/profile/update/info";

            let formData=new FormData();


                formData.append("name",this.name);
                formData.append("address",this.address);
                formData.append("phone",this.phone);
                formData.append("email",this.email);


                 if(this.$refs.photo.files[0]!=null)
                     formData.append("photo",this.$refs.photo.files[0]);

            await this.$http.post(url,formData,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    this.$toaster.success(response.data.msg);
                    location.reload();
                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
            this.profileReload();
        },
        loadPhoto(e){
            
            this.errMsgFlag=false;
            this.msgFlag=false;
            const file= e.target.files[0];
            let Extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
            if ( Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg") {
                this.photo = URL.createObjectURL(file);              
            }
            else
            {
                this.errMsg="Image only allows file types of  PNG, JPG, JPEG and BMP.";
                this.errMsgFlag=true;
                this.msgFlag=false;
                this.$toaster.warning(this.errMsg);
            }
        },
        getProfileInfo(){
           this.name=this.$store.state.userInfo.name; 
           this.address=this.$store.state.userInfo.address; 
           this.email=this.$store.state.userInfo.email; 
           this.photo=this.$store.state.userInfo.avatar; 
           this.phone=this.$store.state.userInfo.phone; 
        },
         resetForm(){  

            this.name=null;
            this.address=null;
            this.email=null;
            this.photo=null;
            this.phone=null;
        },
        async getUserPermissionList(){
             let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/permission/list";

            await this.$http.get(url,config)
             .then(response=>{
                this.permissionList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        logoutFunction(){
            
                   this.$http.get("/logout")
                     .then(response=>{
                       if(response.data.msgFlag==true){
                           window.localStorage.setItem("token",null);
                           window.localStorage.setItem("userInfo",null);
                           this.$store.commit('storeUserInfo',[]);
                           this.$router.push({name:'Home'});
                       }
                       else{
                         this.$toaster.warning(response.data.errMsg);
                         window.localStorage.setItem("token",null);
                         window.localStorage.setItem("userInfo",null);
                         this.$store.commit('storeUserInfo',[]);
                         this.$router.push({name:'Home'});
                       }
                     })
                     .catch(error=>{console.dir(error)})
                     .finally();
        },
        myFunc() {
            const nav = this.$refs.leftNav;
            const rightBody = this.$refs.rightBody;
            nav.classList.toggle('left-nav-hide');
            rightBody.classList.toggle('right-body-remove-padding');
        },
        removeLeftNav() {
            const nav = this.$refs.leftNav;
            const rightBody = this.$refs.rightBody;
            nav.classList.add('left-nav-hide');
            rightBody.classList.add('right-body-remove-padding');
        },
        addLeftNav() {
            const nav = this.$refs.leftNav;
            const rightBody = this.$refs.rightBody;
            nav.classList.remove('left-nav-hide');
            rightBody.classList.remove('right-body-remove-padding');
        },        
    }
}
</script>

<style lang="scss" scoped>
    @import './../assets/css/style.scss';
    @import './../assets/css/style.css';
    $transition: all 0.3s ease;
    $headPadding: 0 10px;
    .dropdown-menu{
        transform: translate3d(-74px, 38px, 0px) !important;
    }
    .bell-text{
       color:red;
       font-weight:bolder;
        font-size:18px;
        margin-left:-8px;
        margin-top:20px!important;
    }
    .layout {
        .left-nav {
            width: 230px;
            height: 100vh;
            overflow-x: auto;
            background: #474141;
            position: fixed;
            transition: $transition;
            padding-bottom: 40px;
            .logo {
                height: 100px;
                img {
                    width: 70%;
                    height: 100px;
                    display: block;
                    margin: 0 auto;
                    object-fit: contain;
                }
            }

    
        
            .menus {
                color: white;
                .menu {
                    a {
                        display: grid;
                        grid: auto-flow / auto 1fr;
                        padding: 0 15px;
                        border-bottom: 1px solid #837f7f;
                        color: white;
                        .menut-item {
                            display: flex;
                            .prefix-icon {
                                padding: 5px 0px;
                            }
                            .menu-text {
                                display: flex;
                                padding: 0 5px;
                                align-items: center;
                            }
                        }
                        &.router-link-active {
                            background: rgb(143, 138, 138);
                        }
                    }
                }
                .collaplse-menu {
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        li {
                            a {
                                display: block;
                                color: white;
                                &.router-link-active {
                                    background: rgb(143, 138, 138);
                                }
                            }
                        }
                    }
                    .point-route-wrapper {
                        display: flex;
                        .point-wrapper {
                            .li-bulet-point {
                                width: 10px;
                                height: 10px;
                                display: inline-block;
                                background: white;
                                border-radius: 50%;
                                margin-right: 5px;
                                margin-left: 20px;
                            }
                        }
                    }
                }
            }
        }
        .right-body {
            width: 100%;
            // for left drawer
            padding-left: 230px;
            transition: $transition;
            .sticky-head{
                height: 100px;
                position: sticky;
                top: 0px;
                z-index: 100;
                .head-top {
                    height: 55%;
                    background: #ffffff;
                    padding: $headPadding;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    p {
                        font-size: 0.6rem;
                        font-style: italic;
                        height: 10px;
                    } 
                    h5 {
                        color: #058700;
                        font-weight: bold;
                    }
                }
                .head-bottom {
                    height: 45%;
                    background: #3ebbc2;
                    padding: $headPadding;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .menu-btn {
                        cursor: pointer;
                        color: white;
                    }
                    .essential-icons {
                        display: flex;
                        column-gap: 15px;
                        & > * {
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        // close drawer style
        .left-nav-hide {
            transform: translateX(-230px);
        }
        .right-body-remove-padding {
            padding-left: 0;
        }
    }
    .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
        color: white;
    }
    .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-extra {
        float: left;
        margin-top: -5px;
        margin-right: 10px;
        font-size: 20px;
    }
    .pointer-margin{
        margin: 20px !important;
    }
</style>