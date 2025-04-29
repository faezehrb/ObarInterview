<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet'; 
import axios from 'axios';
import 'leaflet/dist/leaflet.css'; 


onMounted(() => {
  emit('update:step', 1); 
}); 

const props = defineProps({
  step: Number
})
const emit = defineEmits(['update:step'])

const form = ref({
  firstName: '',
  lastName: '',
  mobile: '',
  phone: '',
  address: '',
  gender: '',
  lat: '',
  lng: '',
});

const errors = ref({});
const loading = ref(false);
const map = ref(null);
const marker = ref(null);

function goBack() {
  emit('update:step', 1);
}

function convertPersianNumbersToEnglish(input) {
  return input.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
}

function handleSubmit() {
  errors.value = {};

  form.value.mobile = convertPersianNumbersToEnglish(form.value.mobile);
  form.value.phone = convertPersianNumbersToEnglish(form.value.phone);

  if (form.value.firstName.length < 3) {
    errors.value.firstName = 'نام باید حداقل ۳ حرف باشد.';
  }
  if (form.value.lastName.length < 3) {
    errors.value.lastName = 'نام خانوادگی باید حداقل ۳ حرف باشد.';
  }
  if (!/^\d{11}$/.test(form.value.mobile)) {
    errors.value.mobile = 'شماره موبایل باید ۱۱ رقم باشد.';
  }
  if (form.value.phone && !/^\d{11}$/.test(form.value.phone)) {
    errors.value.phone = 'شماره تلفن ثابت باید ۱۱ رقم باشد.';
  }
  if (form.value.address.length < 10) {
    errors.value.address = 'آدرس باید حداقل ۱۰ حرف باشد.';
  }
  if (!form.value.gender) {
    errors.value.gender = 'لطفا جنسیت را انتخاب کنید.';
  }

  if (Object.keys(errors.value).length === 0) {
    emit('update:step', 2);
    initMap();
  }
}

async function submitForm() {
  loading.value = true;

  const toInternational = (number) => number.replace(/^0/, '98');

  const payload = {
    first_name: form.value.firstName,
    last_name: form.value.lastName,
    coordinate_mobile: toInternational(form.value.mobile),
    coordinate_phone_number: form.value.phone ? toInternational(form.value.phone) : "",
    address: form.value.address,
    region: 1,
    lat: parseFloat(form.value.lat),
    lng: parseFloat(form.value.lng),
    gender: form.value.gender || ""
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4"
  };

  try {
    const response = await axios.post(
      "https://stage.achareh.ir/api/karfarmas/address",
      payload,
      { headers }
    );
    console.log("✅ موفقیت:", response.data);
    emit('update:step', 3);
  } catch (error) {
    if (error.response) {
      console.error(" خطای سمت سرور:", error.response.status);
      console.error(" پیام سرور:", error.response.data);
    } else {
      console.error(" خطا:", error.message);
    }
  } finally {
    loading.value = false;
  }
}

function initMap() {
  setTimeout(() => {
    map.value = L.map('map').setView([35.6892, 51.3890], 12); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map.value);

    map.value.on('click', (e) => {
      const { lat, lng } = e.latlng;
      form.value.lat = lat;
      form.value.lng = lng;

      if (marker.value) {
        marker.value.setLatLng(e.latlng);
      } else {
        marker.value = L.marker(e.latlng).addTo(map.value);
      }
    });
  }, 300); 
}
</script>

<template>
  <form v-if="props.step === 1" id="mainForm" @submit.prevent="handleSubmit" class="row g-3">
    <div class="col-md-4 col-sm-12 mb-4">
      <label for="firstName" class="form-label">نام</label>
      <input type="text" v-model="form.firstName" placeholder="مثال: محمد رضا" id="firstName" class="form-control" :class="{'is-invalid': errors.firstName}" />
      <div class="invalid-feedback">{{ errors.firstName }}</div>
    </div>

    <div class="col-md-4 col-sm-12 mb-4">
      <label for="lastName" class="form-label">نام خانوادگی</label>
      <input type="text" v-model="form.lastName" placeholder="مثال: رضایی" id="lastName" class="form-control" :class="{'is-invalid': errors.lastName}" />
      <div class="invalid-feedback">{{ errors.lastName }}</div>
    </div>

    <div class="col-md-4 col-sm-12 mb-4">
      <label for="mobile" class="form-label">شماره تلفن همراه</label>
      <input type="tel" v-model="form.mobile" id="mobile" placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷" class="form-control" :class="{'is-invalid': errors.mobile}" />
      <div class="invalid-feedback">{{ errors.mobile }}</div>
    </div>

    <div class="col-md-4 col-sm-12 mb-4">
      <label for="phone" class="form-label">شماره تلفن ثابت (اختیاری)</label>
      <input type="tel" v-model="form.phone" id="phone" placeholder="مثال: ۰۲۱۶۵۴۷۳۷۴" class="form-control" :class="{'is-invalid': errors.phone}" />
      <div class="invalid-feedback">{{ errors.phone }}</div>
    </div>

    <div class="col-md-8 col-sm-12 mb-4">
      <label for="address" class="form-label">آدرس</label>
      <textarea v-model="form.address" id="address" rows="3" class="form-control" :class="{'is-invalid': errors.address}"></textarea>
      <div class="invalid-feedback">{{ errors.address }}</div>
    </div>

    <div class="col-12">
      <label class="form-label">جنسیت</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="gender" value="male" v-model="form.gender" id="male" />
        <label class="form-check-label" for="male">آقا</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="gender" value="female" v-model="form.gender" id="female" />
        <label class="form-check-label" for="female">خانم</label>
      </div>
      <div v-if="errors.gender" class="text-danger small mt-1">{{ errors.gender }}</div>
    </div>
  </form>

  <div v-else-if="props.step === 2" class="map-step p-0">
    <div class="d-flex align-items-center justify-content-between p-4 ">
        <h4 class="m-0 fs-16 d-flex align-items-center gap-2">
        <img @click="goBack" src="../assets/back.svg" alt="بازگشت" width="24" height="24" style="cursor: pointer;" />
        انتخاب آدرس
        </h4>
    </div>
    <div id="map" style="height: 400px;"></div>
  </div>

  <div v-else-if="props.step === 3" class="success-message">
    <img src="../assets/checked.svg" alt="" width="24" height="24"/>
    <h4 class="m-2 fs-14">اطلاعات شما با موفقیت ثبت شد</h4>
    <router-link to="/addresslist" class="btn coustombtn-success mt-5">مشاهده اطلاعات</router-link>
  </div>

  <div v-if="props.step !== 3" class="fixed-footer d-flex align-items-start justify-content-center">
    <button 
      v-if="props.step === 1" 
      type="submit" 
      form="mainForm" 
      class="btn"
    >
      ثبت و ادامه
    </button>

    <button 
      v-else-if="props.step === 2" 
      class="btn "
      @click="submitForm"
      :disabled="loading"
    >
      <span v-if="loading">...</span>
      <span v-else>ثبت و ادامه</span>
    </button>
  </div>
</template>

<style scoped>
.btn{
  background-color: #00BFA5;
  color: #ffffff;
  width: 30%;
}
.form-control{
  height: 46px !important;
  text-align: right;
  font-size: 14px;
}
#mainForm{
  padding: 3rem 4rem;
}
.form-wrapper {
  max-width: 800px;
  margin: 100px auto 0;
  background: #fff;
  padding: 2rem;
  padding-bottom: 100px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px 0px #00000040;
}
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.form-check-input:checked {
  background-color: #00BFA5; 
  border-color: #00BFA5;
}
</style>