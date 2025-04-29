<template>
    <div>
      <div v-if="loading" class="text-right my-4">
        در حال بارگذاری...
      </div>
  
      <div v-else-if="addresses.length === 0" class="text-right my-4 text-danger">
        هیچ آدرسی ثبت نشده است.
      </div>
      
      <ul v-else class="address-list">
        <h2 class="title"> آدرس‌ها و مشخصات</h2>
        <li 
            v-for="address in addresses.slice(0, 5)" 
            :key="address.id" 
            class="address-item"
            >
            <div class="info-grid">
                <div>
                <div class="label">نام</div>
                <div class="value">{{ address.first_name }}</div>
                </div>
                <div>
                <div class="label">نام خانوادگی</div>
                <div class="value">{{ address.last_name }}</div>
                </div>
                <div>
                <div class="label">شماره موبایل</div>
                <div class="value">{{ address.coordinate_mobile }}</div>
                </div>
                <div>
                <div class="label">تلفن ثابت</div>
                <div class="value">{{ address.coordinate_phone_number || '-' }}</div>
                </div>
                <div>
                <div class="label">جنسیت</div>
                <div class="value">{{ address.gender === 'male' ? 'آقا' : 'خانم' }}</div>
                </div>
                <div>
                <div class="label">آدرس</div>
                <div class="value">{{ address.address }}</div>
                </div>
            </div>
            </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps(['step']);
  const emit = defineEmits(['update:step']);
  

  emit('update:step', 3);
  
  const addresses = ref([]);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
        // اینجا سعی کردم لیمیت بزارم که ۵ تا رو لود کنه سریع تر باشه موقع دریافت ولی قبول نکرد
      const response = await fetch('https://stage.achareh.ir/api/karfarmas/address', {
        headers: {
          Authorization: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4',
        },
      });
      const data = await response.json();
      addresses.value = data.slice(0, 5);
    } catch (error) {
      console.error(' خطا در دریافت آدرس‌ها:', error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>

  
  .title {
    font-size: 16px;
    margin-bottom: 2rem;
    text-align: right;
    margin-top: 7rem;
  }
  
  .address-list {
    list-style: none;
    padding: 0;
  }
  
  .address-item {
    background-color: #FFFFFF;
    padding: 2em;
    border-radius: 4px;
    border-color: #EDF0F2;
    box-shadow: 0px 0px 16px 0px #00000014;
    margin: 50px auto;
    max-width: 990px;
  }
  .info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 2rem;
  direction: rtl;
  text-align: right;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.label {
  color: #9B9B9B;
  font-size: 14px;
}

.value {
  font-weight: bold;  
  font-size: 16px;
  margin-top: 4px;
  color: #37474F;
}
  </style>