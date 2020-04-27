<template>
  <div>
    <div class="car">
      <div class="body">
        <div class="mirror-wrap">
          <div class="mirror-inner">
            <div class="mirror">
              <div class="shine"></div>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="top">
            <div class="line"></div>
          </div>
          <div class="bottom">
            <div class="lights">
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div class="bumper">
          <div class="top"></div>
          <div class="middle" data-numb="Checking..."></div>
          <div class="bottom"></div>
        </div>
      </div>
      <div class="tyres">
        <div class="tyre back"></div>
        <div class="tyre front"></div>
      </div>
    </div>
    <div class="road-wrap">
      <div class="road">
        <div class="lane-wrap">
          <div class="lane">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .car .mirror-wrap:before,
  .car .mirror-wrap:after,
  .car .mirror-inner:before,
  .car .mirror-inner:after,
  .car .middle .top:before,
  .car .middle .top:after,
  .car .lights:before,
  .car .lights:after,
  .car .bumper .top:before,
  .car .bumper .top:after,
  .car .bumper .middle:before,
  .car .tyres .tyre:before,
  .car .tyres .tyre:after
  {
    content:'';
    position:absolute;
  }
  .car{
    z-index:1;
    margin-top:20%;
    left: 46.5%;
    position:relative;
    display:inline-block;
  }
  .car .body{
    z-index:1;
    position:relative;
    animation:suspension 4s linear infinite;
  }
  .car .mirror-wrap{
    width:88px;
    height:30px;
    margin:auto;
    position:relative;
    background-color:rgba(0,0,0,0);
    border-top-left-radius:45px 10px;
    border-top-right-radius:45px 10px;
  }
  .car .mirror-wrap:before,
  .car .mirror-wrap:after{
    top:8px;
    border:5px solid #1a1c20;
    border-top:15px solid transparent;
  }
  .car .mirror-wrap:before{
    left:-5px;
    border-left:0 solid transparent;
  }
  .car .mirror-wrap:after{
    right:-5px;
    border-right:0 solid transparent;
  }
  .car .mirror-inner{
    top:2px;
    width:inherit;
    height:inherit;
    margin:inherit;
    position:inherit;
    background-color:#1a1c20;
    border-top-left-radius:50px 8px;
    border-top-right-radius:50px 8px;
  }
  .car .mirror-inner:before,
  .car .mirror-inner:after{
    bottom:0;
    width:10px;
    height:8px;
    background-color:#252525;
  }
  .car .mirror-inner:before{
    left:-12px;
    border-radius:2px 0 0 5px;
  }
  .car .mirror-inner:after{
    right:-12px;
    border-radius:0 2px 5px 0;
  }
  .car .mirror{
    width:100%;
    z-index:10;
    height:25px;;
    overflow:hidden;
    position:relative;
    border-top-left-radius:45px 10px;
    border-top-right-radius:45px 10px;
  }
  .car .mirror .shine{
    left:50%;
    width:5px;
    z-index:-1;
    height:40px;
    position:absolute;
    margin-left:-2.5px;
    background-color:#3d3e3e;
    animation:shine 4s linear infinite;
  }
  .car .middle{
    z-index:1;
    margin-top:-2px;
  }
  .car .middle .top{
    width:98px;
    height:14px;
    margin:auto;
    position:relative;
    background-color:#f7f7f7;
  }
  .car .middle .top:before,
  .car .middle .top:after{
    top:0;
    border:5px solid #f7f7f7;
    border-top:9px solid transparent;
  }
  .car .middle .top:before{
    left:-7px;
    border-left:2px solid transparent;
  }
  .car .middle .top:after{
    right:-7px;
    border-right:2px solid transparent;
  }
  .car .middle .top .line{
    top:2px;
    height:1px;
    width:44px;
    margin:auto;
    position:relative;
    background-color:#bebebe;
  }
  .car .middle .bottom{
    margin:auto;
    width:115px;
    height:20px;
    margin-top:-2px;
    background-color:#dfdfdf;
    border-top-left-radius:4px 5px;
    border-top-right-radius:4px 5px;
  }
  .car .lights{
    top:5px;
    width:111px;
    height:12px;
    margin:auto;
    position:relative;
    border-radius:2px;
    background-color:#6a6a6a;
  }
  .car .lights:before,
  .car .lights:after{
    top:50%;
    width:16px;
    height:16px;
    margin-top:-8px;
    border-radius:50%;
    background-color:#fff;
    border:1px solid #777;
  }
  .car .lights:before{left:3px}
  .car .lights:after{right:3px}
  .car .lights .line{
    top:50%;
    left:50%;
    width:50%;
    height:1px;
    background:#fff;
    position:absolute;
    transform:translateX(-50%);
  }
  .car .bumper .top{
    width:110px;
    height:10px;
    margin:auto;
    position:relative;
    background-color:#202428;
    border-radius:0 0 6px 6px;
    border-top:1px solid #474949;
    border-bottom:1px solid #474949;
  }
  .car .bumper .top:before,
  .car .bumper .top:after{
    top:50%;
    width:10px;
    height:4px;
    margin-top:-2px;
    border-radius:1px;
    background-color:#FB8C00;
  }
  .car .bumper .top:before{left:5px}
  .car .bumper .top:after{right:5px}
  .car .bumper .middle{
    height:8px;
    width:102px;
    margin:auto;
    position:relative;
    background-color:#cfcfcf;
    border-radius:0 0 6px 6px;
  }
  .car .bumper .middle:before{
    top:50%;
    left:50%;
    color:#fff;
    height:12px;
    font-size:8px;
    padding:1px 4px;
    font-weight:500;
    margin-top:-6px;
    line-height:10px;
    text-align:center;
    white-space:nowrap;
    content:attr(data-numb);
    background-color:#E9573F;
    transform:translateX(-50%);
  }
  .car .bumper .bottom{
    height:6px;
    width:85px;
    margin:auto;
    position:relative;
    background-color:#202428;
    border-radius:0 0 6px 6px;
    box-shadow:0 1px 11px rgba(0,0,0,.75);
  }
  .car .tyres{
    margin:auto;
    width:110px;
    position:relative;
  }
  .car .tyres .tyre{
    width:100%;
    height:40px;
    bottom:-6.5px;
    position:absolute;
  }
  .car .tyres .tyre:before{
    left:-5px;
    box-shadow:-2px 2px 0 #b7b7b8 inset;
  }
  .car .tyres .tyre:after{
    right:-5px;
    box-shadow:2px 2px 0 #b7b7b8 inset;
  }
  .car .tyres .tyre:before,
  .car .tyres .tyre:after{
    width:18px;
    height:40px;
    border-radius:6px;
    background-color:#1a1c20;
    background:linear-gradient(to right,#333 50%,#555 50%);
    background-size:2px;
  }
  .car .tyres .tyre.back:before,
  .car .tyres .tyre.back:after{bottom:3px}
  .car .tyres .tyre.back:before{left:12px}
  .car .tyres .tyre.back:after{right:12px}

  .road-wrap{
    perspective:160px;
  }
  .road-wrap .road{
    margin-top:-360px;
    transform:rotateX(80deg);
  }
  .road-wrap .lane-wrap{
    animation:steer 4s linear infinite;
  }
  .road-wrap .lane{
    width:20px;
    margin:auto;
  }
  .road-wrap .lane>div{
    width:100%;
    margin:auto;
    margin-top:30px;
    margin-bottom:30px;
    background-color:#fff;
    animation:lane 4s linear infinite;
  }
  .road-wrap .lane>div:nth-child(1){height:15px}
  .road-wrap .lane>div:nth-child(2){height:20px}
  .road-wrap .lane>div:nth-child(3){height:30px}
  .road-wrap .lane>div:nth-child(4){height:50px}
  .road-wrap .lane>div:nth-child(5){height:40px}
  .road-wrap .lane>div:nth-child(6){height:50px}
  .road-wrap .lane>div:nth-child(7){height:40px}
  .road-wrap .lane>div:nth-child(8){height:50px}
  .road-wrap .lane>div:nth-child(9){height:30px}
  .road-wrap .lane>div:nth-child(10){height:20px}
  .road-wrap .lane>div:nth-child(11){height:15px}

  @keyframes shine{
    0%,80%,100%{
      transform:translateX(-55px) rotate(24deg);
    }
    5%,15%,25%,35%,45%,55%,65%,75%,85%,95%{background-color:#2d2d2d}
    0%,10%,20%,30%,40%,50%,60%,70%,80%,90%,100%{background-color:#4d4d4d}
    33%,44%{
      transform:translateX(30px) rotate(-14deg);
    }
    66%{
      transform:translateX(0px) rotate(-10deg);
    }
  }
  @keyframes lane{
    0%{
      transform:translateY(320px);
    }
    100%{
      transform:translateY(-160px);
    }
  }
  @keyframes steer{
    0%,100%{
      transform:translateX(-15px) rotate(5deg);
    }
    50%{
      transform:translateX(15px) rotate(-5deg)
    }
  }
  @keyframes suspension{
    0%,75%,100%{
      transform:rotate(3deg)
    }
    10%,30%,50%,70%,90%{top:0}
    20%,40%,60%,80%,100%{top:-1px}
    25%,50%{
      transform:rotate(-3deg)
    }
    20%{transform:rotate(0deg)}
    90%{transform:rotate(-1deg)}
  }
</style>