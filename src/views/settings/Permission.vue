<template>
	<ul id="myUL" class="p-5 h5  ">
		
		<li class="mt-2">
		  	<span class="caret " :class="$store.state.selectedRolePermission.permissionList.includes(777) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="DistrictPermission"  @click="addOrRemovePermission('District Permission','সমস্ত এলাকার অনুমতি ',777)" :checked="$store.state.selectedRolePermission.permissionList.includes(777)"> 
		       	<label for="DistrictPermission"> সমস্ত এলাকার অনুমতি (All Areas Permission)</label>
		  	</span>
		</li>
		<li class="mt-2">
		  	<span class="caret " :class="$store.state.selectedRolePermission.permissionList.includes(999) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="DistrictPermission"  @click="addOrRemovePermission('District Permission','জেলা ভিত্তিক অনুমতি',999)" :checked="$store.state.selectedRolePermission.permissionList.includes(999)"> 
		       	<label for="DistrictPermission"> জেলা ভিত্তিক অনুমতি (District Permission)</label>
		  	</span>
		</li>
		<li class="mt-2" :class="$store.state.selectedRolePermission.permissionList.includes(888) ? 'text-success':'text-primary'">
		  	<span class="caret" >
		  		<input type="checkbox" id="UpazilaPermission" @click="addOrRemovePermission('Upazila Permission','উপজেলা ভিত্তিক অনুমতি',888)" :checked="$store.state.selectedRolePermission.permissionList.includes(888)" > 
		       	<label for="UpazilaPermission"> উপজেলা ভিত্তিক অনুমতি (Upazila Permission)</label>
		  	</span>
		</li>
		<li >
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(1) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="dashboard" @click="addOrRemovePermission('Dashboard Permission','ড্যাশবোর্ড অনুমতি',1)" :checked="$store.state.selectedRolePermission.permissionList.includes(1)"> 
		       	<label for="dashboard"> ড্যাশবোর্ড (Dashboard)</label>
		  	</span>
		  	<ul class="nested pl-3">
				<li>
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(2) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Dashboard Permission','সংক্ষিপ্ত তথ্য অনুমতি',2)" :checked="$store.state.selectedRolePermission.permissionList.includes(2)" >
			       		<label for="ProductAdd">সংক্ষিপ্ত তথ্য (Card Info)</label>
			      	</span>
			     </li>
			     <li>
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(3) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Dashboard Permission','গ্রাফ তথ্য অনুমতি',3)" :checked="$store.state.selectedRolePermission.permissionList.includes(3)" >
			       		<label for="ProductAdd">গ্রাফ তথ্য (Graph Info)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>
		
		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(4) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Application List Permission','আবেদন তালিকা অনুমতি',4)" :checked="$store.state.selectedRolePermission.permissionList.includes(4)" > 
		       	<label for="Products"> আবেদন তালিকা (Application List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				<li>
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(5) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Application Grant Permission','আবেদন গ্রহণ অনুমতি',5)" :checked="$store.state.selectedRolePermission.permissionList.includes(5)" >
			       		<label for="ProductAdd">আবেদন গ্রহণ (Application Grant Permission)</label>
			      	</span>
			     </li>
			     <li>
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(6) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Application Reject Permission','আবেদন বাতিল অনুমতি',6)" :checked="$store.state.selectedRolePermission.permissionList.includes(6)" >
			       		<label for="ProductAdd">আবেদন বাতিল (Application Reject Permission)</label>
			      	</span>
			     </li>
			     <li>
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(69) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Application Update Permission','আবেদন হালনাগাদ অনুমতি',69)" :checked="$store.state.selectedRolePermission.permissionList.includes(69)" >
			       		<label for="ProductAdd">আবেদন হালনাগাদ (Application Update Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>
		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(7) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Summon List Permission','মামলার প্রতি সমন তালিকা অনুমতি',7)" :checked="$store.state.selectedRolePermission.permissionList.includes(7)" > 
		       	<label for="Products"> মামলার প্রতি সমন তালিকা (Case Summon List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				<li>
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(8) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Summon Send By SMS Permission','মামলার প্রতি সমন খুদেবার্তা পাঠান অনুমতি',8)" :checked="$store.state.selectedRolePermission.permissionList.includes(8)" >
			       		<label for="ProductAdd">মামলার প্রতি সমন খুদেবার্তা পাঠান (Case Summon Send By SMS Permission)</label>
			      	</span>
			     </li>
			     <li>
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(9) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Summon Send By Letter Permission','মামলার প্রতি সমন চিঠি পাঠান অনুমতি',9)" :checked="$store.state.selectedRolePermission.permissionList.includes(9)" >
			       		<label for="ProductAdd">মামলার প্রতি সমন চিঠি পাঠান (Case Summon Send By Letter Permission)</label>
			      	</span>
			     </li>
			     <li>
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(10) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Summon Print Permission','মামলার প্রতি সমন ছাপুন অনুমতি',10)" :checked="$store.state.selectedRolePermission.permissionList.includes(10)" >
			       		<label for="ProductAdd">মামলার প্রতি সমন ছাপুন (Case Summon Print Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>
		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(11) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Attendance List Permission','মামলার হাজিরা তালিকা অনুমতি',11)" :checked="$store.state.selectedRolePermission.permissionList.includes(11)" > 
		       	<label for="Products"> মামলার হাজিরা তালিকা (Attendance List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				<li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(12) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Attendance Taken Permission','মামলার হাজিরা দিন অনুমতি',12)" :checked="$store.state.selectedRolePermission.permissionList.includes(12)" >
			       		<label for="ProductAdd">মামলার হাজিরা দিন (Attendance Taken Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(13) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Attendance Print Permission','মামলার হাজিরা ছাপুন অনুমতি',13)" :checked="$store.state.selectedRolePermission.permissionList.includes(13)" >
			       		<label for="ProductAdd">মামলার হাজিরা ছাপুন (Attendance Print Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(14) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Filed Case List Permission','রেজিস্টার মামলার তালিকা অনুমতি',14)" :checked="$store.state.selectedRolePermission.permissionList.includes(14)" > 
		       	<label for="Products">রেজিস্টার মামলার তালিকা (Filed Case Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(15) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Filed Case Print Permission','রেজিস্টার মামলার  ছাপুন অনুমতি',15)" :checked="$store.state.selectedRolePermission.permissionList.includes(15)" >
			       		<label for="ProductAdd">রেজিস্টার মামলার  ছাপুন (Filed Case Print Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>
		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(16) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Nomminator List Permission','সদস্য মননোয়ন তালিকা অনুমতি',16)" :checked="$store.state.selectedRolePermission.permissionList.includes(16)" > 
		       	<label for="Products">সদস্য মননোয়ন  তালিকা (Nomminator List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(17) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Nomminator Add Permission','সদস্য মননোয়ন করুন অনুমতি',17)" :checked="$store.state.selectedRolePermission.permissionList.includes(17)" >
			       		<label for="ProductAdd">সদস্য মননোয়ন নিদেশ দিন (Nomminator Add Order Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(67) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Nomminator List Permission','সদস্য মননোয়ন তালিকা অনুমতি',67)" :checked="$store.state.selectedRolePermission.permissionList.includes(67)" > 
		       	<label for="Products">সদস্য মননোয়ন ফর্ম তালিকা (Nomminator List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(68) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Nomminator Add Permission','সদস্য মননোয়ন করুন অনুমতি',68)" :checked="$store.state.selectedRolePermission.permissionList.includes(68)" >
			       		<label for="ProductAdd">সদস্য মননোয়ন করুন (Nomminator Add Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>
		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(18) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Member Attendance Request List Permission','সদস্য উপস্থিতির অনুরোধ তালিকা অনুমতি',18)" :checked="$store.state.selectedRolePermission.permissionList.includes(18)" > 
		       	<label for="Products">সদস্য উপস্থিতির অনুরোধ তালিকা (Member Attendance Request List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(19) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Member Attendance Request List Print Permission','সদস্য উপস্থিতির অনুরোধ ছাপুন অনুমতি',19)" :checked="$store.state.selectedRolePermission.permissionList.includes(19)" >
			       		<label for="ProductAdd">সদস্য উপস্থিতির অনুরোধ ছাপুন (Member Attendance Request List Print Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(20) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Order List Permission','মামলার আদেশনামা তালিকা অনুমতি',20)" :checked="$store.state.selectedRolePermission.permissionList.includes(20)" > 
		       	<label for="Products">মামলার আদেশনামা তালিকা (Case Order List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(21) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Order Print Permission','মামলার আদেশনামা ছাপুন অনুমতি',21)" :checked="$store.state.selectedRolePermission.permissionList.includes(21)" >
			       		<label for="ProductAdd">মামলার আদেশনামা ছাপুন (Case Order Print Permission) </label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(22) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Order Save Permission','মামলার আদেশনামা সেভ করুন অনুমতি',22)" :checked="$store.state.selectedRolePermission.permissionList.includes(22)" >
			       		<label for="ProductAdd">মামলার আদেশনামা সেভ করুন (Case Order Save Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(23) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Mutual Case List Permission','মামলার আপোষনামা তালিকা অনুমতি',23)" :checked="$store.state.selectedRolePermission.permissionList.includes(23)" > 
		       	<label for="Products">মামলার আপোষনামা তালিকা (Mutual Case List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(24) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Mutual Case Print  Permission','মামলার আপোষনামা ছাপুন অনুমতি',24)" :checked="$store.state.selectedRolePermission.permissionList.includes(24)" >
			       		<label for="ProductAdd">মামলার আপোষনামা ছাপুন (Mutual Case Print Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(25) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Mutual Case Save Permission','মামলার আপোষনামা সেভ করুন অনুমতি',25)" :checked="$store.state.selectedRolePermission.permissionList.includes(25)" >
			       		<label for="ProductAdd">মামলার আপোষনামা সেভ করুন (Mutual Case Save Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(26) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Degree or Order List Permission','মামলার ডিগ্রী বা আদেশের ফরম তালিকা অনুমতি',26)" :checked="$store.state.selectedRolePermission.permissionList.includes(26)" > 
		       	<label for="Products">মামলার ডিগ্রী বা আদেশের ফরম তালিকা (Case Degree or Order List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(27) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Degree or Order Print Permission','মামলার ডিগ্রী বা আদেশের ফরম ছাপুন অনুমতি',27)" :checked="$store.state.selectedRolePermission.permissionList.includes(27)" >
			       		<label for="ProductAdd">মামলার ডিগ্রী বা আদেশের ফরম ছাপুন (Case Degree or Order Print Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(28) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Degree or Order Save Permission','মামলার ডিগ্রী বা আদেশের ফরম সেভ করুন অনুমতি',28)" :checked="$store.state.selectedRolePermission.permissionList.includes(28)" >
			       		<label for="ProductAdd">মামলার ডিগ্রী বা আদেশের ফরম সেভ করুন (Case Degree or Order Save Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(29) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Send To High Court List Permission','মামলার উচ্চ আদালতে পাঠানো তালিকা অনুমতি',29)" :checked="$store.state.selectedRolePermission.permissionList.includes(29)" > 
		       	<label for="Products">মামলার উচ্চ আদালতে পাঠানো তালিকা (Case Send To High Court List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(30) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Send To High Court Print Permission','মামলার উচ্চ আদালতে পাঠানো ছাপুন অনুমতি',30)" :checked="$store.state.selectedRolePermission.permissionList.includes(30)" >
			       		<label for="ProductAdd">মামলার উচ্চ আদালতে পাঠানো ছাপুন (Case Send To High Court Print Permission) </label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(31) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Send To Local Court List Permission','মামলার ফৌজদারী আদালতে পাঠানো তালিকা অনুমতি',31)" :checked="$store.state.selectedRolePermission.permissionList.includes(31)" > 
		       	<label for="Products">মামলার ফৌজদারী আদালতে পাঠানো তালিকা (Case Send To Local Court List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(32) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Send To High Court Print Permission','মামলার ফৌজদারী আদালতে পাঠানো ছাপুন অনুমতি',32)" :checked="$store.state.selectedRolePermission.permissionList.includes(32)" >
			       		<label for="ProductAdd">মামলার ফৌজদারী আদালতে পাঠানো ছাপুন (Case Send To Local Court Print Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(33) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Slip List Permission','মামলার স্লিপ তালিকা অনুমতি',33)" :checked="$store.state.selectedRolePermission.permissionList.includes(33)" > 
		       	<label for="Products">মামলার স্লিপ তালিকা (Case Slip List Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(34) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Case Slip Print Permission','মামলার স্লিপ ছাপুন অনুমতি',34)" :checked="$store.state.selectedRolePermission.permissionList.includes(34)" >
			       		<label for="ProductAdd">মামলার স্লিপ ছাপুন (Case Slip Print Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(35) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Report Permission','রিপোর্ট অনুমতি',35)" :checked="$store.state.selectedRolePermission.permissionList.includes(35)" > 
		       	<label for="Products">রিপোর্ট (Report)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(36) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Register Case Report Permission','রেজিস্টার মামলা অনুমতি',36)" :checked="$store.state.selectedRolePermission.permissionList.includes(36)" >
			       		<label for="ProductAdd">রেজিস্টার মামলা (Register Case Report Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(37) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Degree and Order Report Permission','ডিগ্ৰী এবং আদেশের রেজিস্টার অনুমতি',37)" :checked="$store.state.selectedRolePermission.permissionList.includes(37)" >
			       		<label for="ProductAdd">ডিগ্ৰী এবং আদেশের রেজিস্টার (Degree and Order Report Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(38) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Compensation Report Permission','ক্ষতিপূরণের অর্থ লেনদেন রেজিস্টার অনুমতি',38)" :checked="$store.state.selectedRolePermission.permissionList.includes(38)" >
			       		<label for="ProductAdd">ক্ষতিপূরণের অর্থ লেনদেন রেজিস্টার (Compensation Report Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(66) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Fee or Fine Report Permission','ফিস বা জরিমানা রেজিস্টার',66)" :checked="$store.state.selectedRolePermission.permissionList.includes(66)" >
			       		<label for="ProductAdd">ফিস বা জরিমানা রেজিস্টার (Fee or Fine Report Permission)</label>
			      	</span>
			     </li>

			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(39) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Sent Letter Report Permission','পত্র প্রদান রেজিস্টার অনুমতি',39)" :checked="$store.state.selectedRolePermission.permissionList.includes(39)" >
			       		<label for="ProductAdd">পত্র প্রদান রেজিস্টার (Sent Letter Report Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(40) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Quarterly report on receipt and disposal of complaints Permission','অভিযোগ গ্রহণ ও নিষ্পত্তির ত্রৈমাসিক প্রতিবেদন অনুমতি',40)" :checked="$store.state.selectedRolePermission.permissionList.includes(40)" >
			       		<label for="ProductAdd">অভিযোগ গ্রহণ ও নিষ্পত্তির ত্রৈমাসিক প্রতিবেদন (Quarterly report on receipt and disposal of complaints Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(41) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Quarterly report under upazila Permission','উপজেলা আওতাধীন ত্রৈমাসিক প্রতিবেদন অনুমতি',41)" :checked="$store.state.selectedRolePermission.permissionList.includes(41)" >
			       		<label for="ProductAdd">উপজেলা আওতাধীন ত্রৈমাসিক প্রতিবেদন (Quarterly report under upazila Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(42) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Quarterly report under district jurisdiction Permission','জেলার আওতাধীন ত্রৈমাসিক প্রতিবেদন অনুমতি',42)" :checked="$store.state.selectedRolePermission.permissionList.includes(42)" >
			       		<label for="ProductAdd">জেলার আওতাধীন ত্রৈমাসিক প্রতিবেদন (Quarterly report under district jurisdiction Permission)</label>
			      	</span>
			     </li>
				
		    </ul>
		</li>

		<li class="mt-2">
		  	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(43) ? 'text-success':'text-primary'">
		  		<input type="checkbox" id="a" @click="addOrRemovePermission('Settings Permission','সেটিংস অনুমতি',43)" :checked="$store.state.selectedRolePermission.permissionList.includes(43)" > 
		       	<label for="Products">সেটিংস (Settings Permission)</label>
		  	</span>
		  	<ul class="nested pl-3">
				
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(44) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Media Permission','মিডিয়া অনুমতি',44)" :checked="$store.state.selectedRolePermission.permissionList.includes(44)" >
			       		<label for="ProductAdd">মিডিয়া (Media Permission)</label>
			      	</span>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(45) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('List of union members Permission','ইউনিয়ন মেম্বার তালিকা অনুমতি',45)" :checked="$store.state.selectedRolePermission.permissionList.includes(45)" >
			       		<label for="ProductAdd">ইউনিয়ন মেম্বার তালিকা (List of union members Permission)</label>
			      	</span>
			      	<ul class="nested pl-3">
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(46) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Add union member  Permission','ইউনিয়ন মেম্বার তালিকা যোগ করুন অনুমতি',46)" :checked="$store.state.selectedRolePermission.permissionList.includes(46)"> 
			       			<label for="ProductDelete">ইউনিয়ন মেম্বার  যোগ করুন (Add union member permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(47) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Update union members Permission','ইউনিয়ন মেম্বার তালিকা হালনাগাদ করুন অনুমতি',47)" :checked="$store.state.selectedRolePermission.permissionList.includes(47)"> 
			       			<label for="ProductDelete">ইউনিয়ন মেম্বার  হালনাগাদ করুন (Update union members Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(48) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Delete union member Permission','ইউনিয়ন মেম্বার তালিকা মুছুন অনুমতি',48)" :checked="$store.state.selectedRolePermission.permissionList.includes(48)"> 
			       			<label for="ProductDelete">ইউনিয়ন মেম্বার তালিকা মুছুন (Delete union member Permission)</label>
			       		</span>
		      		  </li>
			        </ul>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(49) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('TNO List Permission','থানা নির্বাহী কর্মকর্তা তালিকা অনুমতি',49)" :checked="$store.state.selectedRolePermission.permissionList.includes(49)" >
			       		<label for="ProductAdd">থানা নির্বাহী কর্মকর্তা তালিকা (TNO List Permission)</label>
			      	</span>
			      	<ul class="nested pl-3">
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(50) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('TNO Add Permission','থানা নির্বাহী কর্মকর্তা তালিকা যোগ করুন অনুমতি',50)" :checked="$store.state.selectedRolePermission.permissionList.includes(50)"> 
			       			<label for="ProductDelete">থানা নির্বাহী কর্মকর্তা তালিকা যোগ করুন (TNO Add Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(51) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('TNO Update Permission','থানা নির্বাহী কর্মকর্তা তালিকা হালনাগাদ করুন অনুমতি',51)" :checked="$store.state.selectedRolePermission.permissionList.includes(51)"> 
			       			<label for="ProductDelete">থানা নির্বাহী কর্মকর্তা তালিকা হালনাগাদ করুন (TNO Update Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(52) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('TNO Delete Permission','থানা নির্বাহী কর্মকর্তা তালিকা মুছুন অনুমতি',52)" :checked="$store.state.selectedRolePermission.permissionList.includes(52)"> 
			       			<label for="ProductDelete">থানা নির্বাহী কর্মকর্তা তালিকা মুছুন (TNO Delete Permission)</label>
			       		</span>
		      		  </li>
			        </ul>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(53) ? 'text-success':'text-warning'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('DC List Permission','জেলা প্রশাসক তালিকা অনুমতি',53)" :checked="$store.state.selectedRolePermission.permissionList.includes(53)" >
			       		<label for="ProductAdd">জেলা প্রশাসক তালিকা (DC List Permission)</label>
			      	</span>
			      	<ul class="nested pl-3">
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(54) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('DC Add Permission ','জেলা প্রশাসক তালিকা যোগ করুন অনুমতি',54)" :checked="$store.state.selectedRolePermission.permissionList.includes(54)"> 
			       			<label for="ProductDelete">জেলা প্রশাসক তালিকা যোগ করুন (DC Add Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(55) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('DC Update Permission','জেলা প্রশাসক তালিকা হালনাগাদ করুন অনুমতি',55)" :checked="$store.state.selectedRolePermission.permissionList.includes(55)"> 
			       			<label for="ProductDelete">জেলা প্রশাসক তালিকা হালনাগাদ করুন (DC Update Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(56) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('DC Delete Permission','জেলা প্রশাসক তালিকা মুছুন অনুমতি',56)" :checked="$store.state.selectedRolePermission.permissionList.includes(56)"> 
			       			<label for="ProductDelete">জেলা প্রশাসক তালিকা মুছুন (DC Delete Permission)</label>
			       		</span>
		      		  </li>
			        </ul>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(57) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Staff List Permission','কর্মী তালিকা অনুমতি',57)" :checked="$store.state.selectedRolePermission.permissionList.includes(57)" >
			       		<label for="ProductAdd">কর্মী তালিকা (Staff List Permission)</label>
			      	</span>
			      	<ul class="nested pl-3">
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(58) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Staff Add Permission','কর্মী তালিকা যোগ করুন অনুমতি',58)" :checked="$store.state.selectedRolePermission.permissionList.includes(58)"> 
			       			<label for="ProductDelete">কর্মী তালিকা যোগ করুন (Staff Add Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(59) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Staff Update Permission','কর্মী তালিকা হালনাগাদ করুন অনুমতি',59)" :checked="$store.state.selectedRolePermission.permissionList.includes(59)"> 
			       			<label for="ProductDelete">কর্মী তালিকা হালনাগাদ করুন (Staff Update Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(60) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Staff Delete Permission','কর্মী তালিকা মুছুন অনুমতি',60)" :checked="$store.state.selectedRolePermission.permissionList.includes(60)"> 
			       			<label for="ProductDelete">কর্মী তালিকা মুছুন (Staff Delete Permission)</label>
			       		</span>
		      		  </li>
			        </ul>
			     </li>
			     <li class="mt-1">
			      	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(61) ? 'text-success':'text-info'">
			      		<input type="checkbox" id="a" @click="addOrRemovePermission('Role List Permission','ভূমিকা তালিকা অনুমতি',61)" :checked="$store.state.selectedRolePermission.permissionList.includes(61)" >
			       		<label for="ProductAdd">ভূমিকা তালিকা (Role List Permission)</label>
			      	</span>
			      	<ul class="nested pl-3">
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(62) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Role Add Permission','ভূমিকা তালিকা যোগ করুন অনুমতি',62)" :checked="$store.state.selectedRolePermission.permissionList.includes(62)"> 
			       			<label for="ProductDelete">ভূমিকা তালিকা যোগ করুন (Role Add Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(63) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Role Update Permission','ভূমিকা তালিকা হালনাগাদ করুন অনুমতি',63)" :checked="$store.state.selectedRolePermission.permissionList.includes(63)"> 
			       			<label for="ProductDelete">ভূমিকা তালিকা হালনাগাদ করুন (Role Update Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(64) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Role Delete Permission','ভূমিকা তালিকা মুছুন অনুমতি',64)" :checked="$store.state.selectedRolePermission.permissionList.includes(64)"> 
			       			<label for="ProductDelete">ভূমিকা তালিকা মুছুন (Role Delete Permission)</label>
			       		</span>
		      		  </li>
		      		  <li>
			          	<span class="caret" :class="$store.state.selectedRolePermission.permissionList.includes(65) ? 'text-success':'text-warning'">
			          		<input type="checkbox" @click="addOrRemovePermission('Role Permission Set Permission','ভূমিকা অনুমতি সেট অনুমতি',65)" :checked="$store.state.selectedRolePermission.permissionList.includes(65)"> 
			       			<label for="ProductDelete">ভূমিকা অনুমতি সেট করুন (Role Permission Set Permission)</label>
			       		</span>
		      		  </li>
			        </ul>
			     </li>
		    </ul>
		</li>
	</ul>

</template>
<script>
export default{
	name: "Permissions",
	data(){
		return {
			// userPermissions:[]
		}
	},
	mounted(){
		// if(this.$store.state.selectedUserPermission!=null)
		// 	this.userPermissions=this.$store.state.selectedUserPermission.dataList;
	},
	methods:{
		async addOrRemovePermission(permissionName,permissionNameBn,permissionCode){
			let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/permission/add/or/remove";

			let formData=new FormData();
			formData.append("permissionName",permissionName);
			formData.append("permissionNameBn",permissionNameBn);
			formData.append("permissionCode",permissionCode);
			if(this.$store.state.selectedRolePermission!=null)
				formData.append("roleId",this.$store.state.selectedRolePermission.roleId);
			await this.$http.post(url,formData,config)
			 .then(response=>{
			 	if(response.data.msgFlag==true)
			 		this.$toaster.success(response.data.msg);
			 	if(response.data.errMsgFlag==true)
			 		this.$toaster.warning(response.data.errMsg);
			 	// this.refreshSelectedUserPermissionList(this.$store.state.selectedUserPermission.userId);
			 })
			 .catch(error=>{console.dir(error)})
			 .finally();
		},
	
	}
}
</script>
<style lang="scss" scoped>
	ul{
		 list-style-type: none;
	}
	li{
		 list-style-type: none;
	}
</style>