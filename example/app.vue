<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 12:11-->
<template>
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <router-view></router-view>
                </div>
                <div class="col-md-4 add-m">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <a v-link="{name:'ms-modal'}">ms-modal</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-alert'}">ms-alert</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-confirm'}">ms-confirm</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-datepicker'}">ms-datepicker</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-date-field'}">ms-date-field</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-date-range-field'}">ms-date-range-field</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-date-range-single-field'}">ms-date-range-single-field</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-time'}">ms-time</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-grid-panel'}">ms-grid-panel</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-video'}">ms-video</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-pagination'}">ms-pagination</a>
                        </li>
                        <li class="list-group-item">
                            <a v-link="{name:'ms-picker-popup'}">ms-picker-popup</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
    .add-m{margin-top:10px;}
</style>