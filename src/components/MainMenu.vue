<template>
    <nav class="navbar navbar-expand-lg fixed-top w-100">
      <div class="container-fluid px-4">
          
        <router-link class="" to="/">
          <img src="../assets/logo.svg" alt="لوگو" width="70" height="39" />
        </router-link>
  
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse p-0" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link fs-6" active-class="active">ثبت آدرس</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/addresslist" class="nav-link fs-6" active-class="active">مشاهده آدرس‌ها</router-link>
            </li>
          </ul>
        </div>
  
      </div>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    background-color: #ffffff;
    box-shadow: 0px 0.5px 2px 0px #00000026;
  }
  @media (max-width: 991px) {
    #navbarNav {
      height: 74px;
      text-align: center;
    }
  
    #navbarNav .navbar-nav {
      justify-content: center;
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .navbar-brand img {
      width: 90px;
    }
  }
  </style>