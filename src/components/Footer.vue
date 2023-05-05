<script setup>

</script>

<template>
    <footer>
        <div class="blackDiv">
            <ul class="bigUl">
                <li>
                    <ul class="smallUl">
                        <li><h1>Rent a car with Carma</h1></li>
                        <li><p>Every journey is a couple of clicks away</p></li>
                        <li><p>Direction: Anywhere in the world</p></li>
                    </ul>
                </li>

                <li><div class="line"></div></li>

                <li>
                    <ul class="smallUl">
                        <li><h1>Working Hours</h1></li>
                        <li><p>NON STOP</p></li>
                    </ul>
                </li>

                <li><div class="line"></div></li>

                <li>
                    <ul class="smallUl">
                        <li><h1>Carma Advantages</h1></li>
                        <li><p>All taxes are included</p></li>
                        <li><p>Free car pickup & delivery</p></li>
                        <li><p>Free car replacement</p></li>
                        <li><p>24/7 Assistance</p></li>
                        <li><p>Unlimited kilometers</p></li>
                        <li><p>Free car wash</p></li>
                    </ul>
                </li>
                
            </ul>
        </div>
        <div class="orangeDiv">
            <p>Carma Ltd. 2023</p>
        </div>
    </footer>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    footer{
        bottom: 0;
        width: 100%;
    }

    .orangeDiv{
        color: white;
        background-color: rgb(252, 120, 6);
        width: 100%;
        height: 25px;
        padding: 10px;
    }

    .orangeDiv p{
        max-width: 1300px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 5px;
    }

    .blackDiv{
        background-color: black;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }
    h1{
        color: white;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: large;
    }
    ul{
        margin: 0;
        text-align: center;
    }
    p{
        margin: 0;
        color: white;
        font-family: 'Montserrat', sans-serif;
        font-size: small;
    }

    .line{
        height: 100%;
        width: 2px;
        border-radius: 50%;
        background-color: grey;
    }
    .bigUl{
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 50px 0px;
        margin: 0px auto;
        max-width: 1300px;
    }

    .smallUl{
        max-width: 300px;
        padding: 0;
    }


</style>