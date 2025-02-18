 var calcArray = {
  typeProject: 0,
  floorCount: 1,
  floors: [
    {
      num: 1,
      width: 0,
      height: 0,
      checked: false
    }
  ],
  mirrorOrDoor: [
    {
      format: 'mirror',
      width: 0,
      height: 0,
      count: 1
    },
    {
      format: 'door',
      width: 0,
      height: 0,
      count: 1
    },
  ],
  tolshina: [
    {
      width: 0,
    }
  ],
  sizes: {
    cost: 0,
    value: 0.002535,
  },
  kladka: 0.12,
}

function sliderUpdate() {
  $('.calcSlider').each((i, el)=>{
    // console.log($(el))
    $(el).slider({
      // range: false,
      orientation: "horizontal",
      range: "min",
      min: parseInt($(el).data('min')),
      max: parseInt($(el).data('max')),
      value: [ $( ".inputsWithRadio .calcSliderInput" ).eq(i).val() ],
      slide: function( event, ui ) {
        $('.calcSliderInput').eq(i).val(parseInt(ui.value));
        if($('.calcSliderInput').eq(i).parent().parent().parent().parent().parent().hasClass('floors')) {
          let index = $('.calcSliderInput').eq(i).parent().parent().parent().parent().index() - 1;
          if($('.calcSliderInput').eq(i).parent().hasClass('width')) {
            calcArray.floors[index]['width'] = parseInt(ui.value);
          }
          if($('.calcSliderInput').eq(i).parent().hasClass('height')) {
            calcArray.floors[index]['height'] = parseInt(ui.value);
          }
        }
        if($('.calcSliderInput').eq(i).parent().parent().parent().parent().parent().hasClass('mirrorOrDoor')) {
          let index = $('.calcSliderInput').eq(i).parent().parent().parent().parent().index();
          if($('.calcSliderInput').eq(i).parent().hasClass('width')) {
            calcArray.mirrorOrDoor[index]['width'] = parseInt(ui.value);
          }
          if($('.calcSliderInput').eq(i).parent().hasClass('height')) {
            calcArray.mirrorOrDoor[index]['height'] = parseInt(ui.value);
          }
        }
        if($('.calcSliderInput').eq(i).parent().hasClass('tolshina')) {
          calcArray.tolshina[0].width = parseInt(ui.value);
        }
      }
    });
    $('.calcSliderInput').eq(i).on('input', function (e) {
      $(el).slider( "value", $('.calcSliderInput').eq(i).val());
    });
  })
}

// floors
var floorsTimer;

function firstGenerateFloors() {
  let countFloors = calcArray.floors.length;
  for (let i = 0; i < calcArray.floors.length; i++) {
    let floorsElm = calcArray.floors[i];
    let number = i+1;
    if(i >= 1) {
      $('.calcPage .floors').append('<div class="box"><div class="box_title">Этаж '+number+'</div><div class="box_item"><div class="box_row left117"><img class="left" src="/images/icons/calc_1.svg" alt=""><div class="inputsWithRadio width"><label>Длина всех стен, мм</label><input class="calcSliderInput" type="number" value="0" min="0"><div class="item-slider"><div class="calcSlider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="0" data-max="25000"><div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div><div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div></div></div></div><div class="box_row left117"><img class="left" src="/images/icons/calc_2.svg" alt=""><div class="inputsWithRadio height"><label>Высота стен по углам, мм</label><input class="calcSliderInput" type="number" value="0" min="0"><div class="item-slider"><div class="calcSlider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="0" data-max="10000"><div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div><div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div></div></div></div><div class="box_row left117"><div class="checkbox"><input type="checkbox" id="divNum'+i+'"><label for="divNum'+i+'">Как на предыдущем этаже</label></div></div></div></div>')
    }
    else {
      $('.calcPage .floors').append('<div class="box"><div class="box_title">Этаж '+number+'</div><div class="box_item"><div class="box_row left117"><img class="left" src="/images/icons/calc_1.svg" alt=""><div class="inputsWithRadio width"><label>Длина всех стен, мм</label><input class="calcSliderInput" type="number" value="0" min="0"><div class="item-slider"><div class="calcSlider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="0" data-max="25000"><div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div><div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div></div></div></div><div class="box_row left117"><img class="left" src="/images/icons/calc_2.svg" alt=""><div class="inputsWithRadio height"><label>Высота стен по углам, мм</label><input class="calcSliderInput" type="number" value="0" min="0"><div class="item-slider"><div class="calcSlider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="0" data-max="10000"><div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div><div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div></div></div></div></div></div>')
    }
  }
  // start for real time check
  timerChekerFloor();
  // update slider
  sliderUpdate()
  // log
  // console.log(calcArray.floors)
}
firstGenerateFloors();

// edit floors function
function editFloors() {
  let countFloors = calcArray.floors.length;
  for (let i = 0; i < calcArray.floors.length; i++) {
    if($('.calcPage .floors .box').length < countFloors) {
      $('.calcPage .floors').append('<div class="box"><div class="box_title">Этаж '+countFloors+'</div><div class="box_item"><div class="box_row left117"><img class="left" src="/images/icons/calc_1.svg" alt=""><div class="inputsWithRadio width"><label>Длина всех стен, мм</label><input class="calcSliderInput" type="number" value="0" min="0"><div class="item-slider"><div class="calcSlider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="0" data-max="25000"><div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div><div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div></div></div></div><div class="box_row left117"><img class="left" src="/images/icons/calc_2.svg" alt=""><div class="inputsWithRadio height"><label>Высота стен по углам, мм</label><input class="calcSliderInput" type="number" value="0" min="0"><div class="item-slider"><div class="calcSlider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="0" data-max="10000"><div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div><div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div></div></div></div><div class="box_row left117"><div class="checkbox"><input type="checkbox" id="divNum'+countFloors+'"><label for="divNum'+countFloors+'">Как на предыдущем этаже</label></div></div></div></div>')
      // check functions
      // floors checkbox
      $('.calcPage .box .checkbox label').click((e)=>{
        // calcArray.floorCount = parseInt($('.calcPage .floorNumber input').val());
        let index = $(e.currentTarget).parent().parent().parent().parent().index() - 1;
        let checked = !$(e.currentTarget).parent().children('input').prop("checked");
        calcArray.floors[index].checked = checked;
        if(checked) {
          // console.log($('.calcPage .box').eq(index-1).children('.box_item').children('.box_row').children('.width'))
          $(e.currentTarget).parent().parent().parent().children('.box_row').children('.width').children('input').val(calcArray.floors[index-1].width);
          $(e.currentTarget).parent().parent().parent().children('.box_row').children('.height').children('input').val(calcArray.floors[index-1].height);
          calcArray.floors[index].width = calcArray.floors[index-1].width;
          calcArray.floors[index].height = calcArray.floors[index-1].height;
        }
      });
    }
    if($('.calcPage .floors .box').length > countFloors) {
      // $('.calcPage .floors .box:last-child').remove();
      $('.calcPage .floors .box').each((j, elm)=>{
        if($('.calcPage .floors .box').length > countFloors) {
          $('.calcPage .floors .box:last-child').remove();
        }
      });
    }
  }
}

// floors timer function
function timerChekerFloor() {
  floorsTimer = setInterval(()=>{
    if(calcArray.floorCount > calcArray.floors.length) {
      calcArray.floors.push({
        num: calcArray.floorCount + 1,
        width: 0,
        height: 0,
        checked: false
      });
    }
    if(calcArray.floorCount < calcArray.floors.length) {
      calcArray.floors.splice(calcArray.floorCount, 1);
    }
    // update floors list in page
    editFloors();
    // update slider
    sliderUpdate();
    // update functional
    floorInputs();
    // floors synchronization
    floorSync();
    // click function for trash .mirrorOrDoor
    // $('.calcPage .mirrorOrDoor .trash').click((e)=>{
    //   let index = $(e.currentTarget).parent().index();
    //   calcArray.mirrorOrDoor.splice(index, 1);
    //   $(e.currentTarget).parent().remove();
    //   console.log(calcArray)
    // });
    // calculate all
    calced()
    if(calcArray.typeProject == 0){
      // kladka
      $('.kladkaItem').css('display','none');
    }
    if(calcArray.typeProject == 1){
      // kladka
      $('.kladkaItem').css('display','block');
    }
    // log
    // console.log(calcArray.floors)
  }, 1000);
}
// click function for trash .mirrorOrDoor
function mirrorOrDoorTrash(elm) {
  let index = $(elm).parent().index();
  calcArray.mirrorOrDoor.splice(index, 1);
  $(elm).parent().remove();
  console.log(calcArray)
}
// functional for left side
// typeProject
$('.calcPage .typeProject .input').each((i, el)=>{
  $(el).children('label').click(()=>{
    calcArray.typeProject = parseInt($(el).children('input').val());
    // console.log(calcArray)
    showElements()
  })
})

// floorNumber
$('.calcPage .floorNumber button').click(()=>{
  calcArray.floorCount = parseInt($('.calcPage .floorNumber input').val());
});
$('.calcPage .floorNumber input').keyup(()=>{
  calcArray.floorCount = parseInt($('.calcPage .floorNumber input').val());
});
// console.log(calcArray['floorCount'])

// floors sync
function floorSync() {
  for (let i = 0; i < calcArray.floors.length; i++) {
    if(calcArray.floors[i].checked) {
      calcArray.floors[i].width = calcArray.floors[i-1].width;
      calcArray.floors[i].height = calcArray.floors[i-1].height;
      $('.calcPage .floors .box').eq(i).children('.box_item').children('.box_row').children('.width').children('input').val(calcArray.floors[i-1].width);
      $('.calcPage .floors .box').eq(i).children('.box_item').children('.box_row').children('.height').children('input').val(calcArray.floors[i-1].height);
    }
  }
}
// floors inputs & sliders
function floorInputs() {
  $('.calcPage .floors .box').each((i, el)=>{
    $(el).children('.box_item').children('.box_row').children('.inputsWithRadio.width').children('input').keyup((e)=>{
      calcArray.floors[i].width = parseInt(e.currentTarget.value);
    })
    $(el).children('.box_item').children('.box_row').children('.inputsWithRadio.height').children('input').keyup((e)=>{
      calcArray.floors[i].height = parseInt(e.currentTarget.value);
    })
  })
}
floorInputs()

// mirror or door functions .mirrorOrDoor
function firstGenerateMirrorOrDoor() {
  for (let i = 0; i < calcArray.mirrorOrDoor.length; i++) {
    let modFormat = calcArray.mirrorOrDoor[i].format;
    if(modFormat === 'mirror') {
      $('.calcPage .mirrorOrDoor').append('<div class="box_item mirror"><img class="trash" src="/images/icons/redTrash.svg" alt="" onclick="mirrorOrDoorTrash(this)"> <div class="left"> <div class="box_row left117"><img class="left" src="/images/icons/calc_3.svg" alt=""> <div class="inputsWithRadio width"> <label>Длина, мм</label> <input class="calcSliderInput" type="number" value="0" min="0"> <div class="item-slider"> <div class="calcSlider ui-slider ui-corner-all ui-widget ui-widget-content ui-slider-horizontal" data-min="0" data-max="10000"> <div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div> <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div> </div> </div> </div> <div class="box_row left117"><img class="left" src="/images/icons/calc_4.svg" alt=""> <div class="inputsWithRadio height"> <label>Высота, мм</label> <input class="calcSliderInput" type="number" value="0" min="0"> <div class="item-slider"> <div class="calcSlider ui-slider ui-corner-all ui-widget ui-widget-content ui-slider-horizontal" data-min="0" data-max="10000"> <div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div> <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div> </div> </div> </div> </div> <div class="right"> <div class="right_x">х</div> <div class="inputsWithRadio count"> <input type="number" value="1" min="1"> </div> </div> </div>')
    }
    else {
      $('.calcPage .mirrorOrDoor').append('<div class="box_item door"><img class="trash" src="/images/icons/redTrash.svg" alt="" onclick="mirrorOrDoorTrash(this)"> <div class="left"> <div class="box_row left117"><img class="left" src="/images/icons/calc_5.svg" alt=""> <div class="inputsWithRadio height"> <label>Высота, мм</label> <input class="calcSliderInput" type="number" value="0" min="0"> <div class="item-slider"> <div class="calcSlider ui-slider ui-corner-all ui-widget ui-widget-content ui-slider-horizontal" data-min="0" data-max="10000"> <div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div> <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div> </div> </div> </div> <div class="box_row left117"><img class="left" src="/images/icons/calc_6.svg" alt=""> <div class="inputsWithRadio width"> <label>Длина, мм</label> <input class="calcSliderInput" type="number" value="0" min="0"> <div class="item-slider"> <div class="calcSlider ui-slider ui-corner-all ui-widget ui-widget-content ui-slider-horizontal" data-min="0" data-max="10000"> <div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div> <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div> </div> </div> </div> </div> <div class="right"> <div class="right_x">х</div> <div class="inputsWithRadio count"> <input type="number" value="1" min="1"> </div> </div> </div>')
    }
  }
  // update slider
  sliderUpdate()
}
firstGenerateMirrorOrDoor();

function addMirror() {
  calcArray.mirrorOrDoor.push({
    format: 'mirror',
    width: 0,
    height: 0,
    count: 1
  });
  $('.calcPage .mirrorOrDoor').append('<div class="box_item mirror"><img class="trash" src="/images/icons/redTrash.svg" alt="" onclick="mirrorOrDoorTrash(this)"> <div class="left"> <div class="box_row left117"><img class="left" src="/images/icons/calc_3.svg" alt=""> <div class="inputsWithRadio width"> <label>Длина, мм</label> <input class="calcSliderInput" type="number" value="0" min="0"> <div class="item-slider"> <div class="calcSlider ui-slider ui-corner-all ui-widget ui-widget-content ui-slider-horizontal" data-min="0" data-max="10000"> <div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div> <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div> </div> </div> </div> <div class="box_row left117"><img class="left" src="/images/icons/calc_4.svg" alt=""> <div class="inputsWithRadio height"> <label>Высота, мм</label> <input class="calcSliderInput" type="number" value="0" min="0"> <div class="item-slider"> <div class="calcSlider ui-slider ui-corner-all ui-widget ui-widget-content ui-slider-horizontal" data-min="0" data-max="10000"> <div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div> <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div> </div> </div> </div> </div> <div class="right"> <div class="right_x">х</div> <div class="inputsWithRadio count"> <input type="number" value="1" min="1"> </div> </div> </div>')
}
function addDoor() {
  calcArray.mirrorOrDoor.push({
    format: 'door',
    width: 0,
    height: 0,
    count: 1
  });
  $('.calcPage .mirrorOrDoor').append('<div class="box_item door"><img class="trash" src="/images/icons/redTrash.svg" alt="" onclick="mirrorOrDoorTrash(this)"> <div class="left"> <div class="box_row left117"><img class="left" src="/images/icons/calc_5.svg" alt=""> <div class="inputsWithRadio height"> <label>Высота, мм</label> <input class="calcSliderInput" type="number" value="0" min="0"> <div class="item-slider"> <div class="calcSlider ui-slider ui-corner-all ui-widget ui-widget-content ui-slider-horizontal" data-min="0" data-max="10000"> <div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div> <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div> </div> </div> </div> <div class="box_row left117"><img class="left" src="/images/icons/calc_6.svg" alt=""> <div class="inputsWithRadio width"> <label>Длина, мм</label> <input class="calcSliderInput" type="number" value="0" min="0"> <div class="item-slider"> <div class="calcSlider ui-slider ui-corner-all ui-widget ui-widget-content ui-slider-horizontal" data-min="0" data-max="10000"> <div class="ui-slider-handle ui-corner-all ui-state-default" tabindex="0" style="left: 0%;"></div> <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 0%;"></div></div> </div> </div> </div> </div> <div class="right"> <div class="right_x">х</div> <div class="inputsWithRadio count"> <input type="number" value="1" min="1"> </div> </div> </div>')
}
$('.calcPage .mirrorOrDoor .width input').keyup((e)=>{
  let index = $(e.currentTarget).parent().parent().parent().parent().index();
  calcArray.mirrorOrDoor[index]['width'] = parseInt($(e.currentTarget).val());
});
$('.calcPage .mirrorOrDoor .height input').keyup((e)=>{
  let index = $(e.currentTarget).parent().parent().parent().parent().index();
  calcArray.mirrorOrDoor[index]['height'] = parseInt($(e.currentTarget).val());
});
$('.calcPage .mirrorOrDoor .count input').keyup((e)=>{
  let index = $(e.currentTarget).parent().parent().parent().index();
  calcArray.mirrorOrDoor[index]['count'] = parseInt($(e.currentTarget).val());
});

$('.size.radio').each((i, el)=>{
  if($(el).hasClass('disabled')) {
    $(el).children('input').attr('disabled', true);
  }
  if($(el).hasClass('active')) {
    calcArray.sizes.cost = parseFloat($(el).children('input').val());
    calcArray.sizes.value = parseFloat($(el).children('input').data('value'));
  }
  $(el).click(()=>{
    if(!$(el).hasClass('disabled')) {
      removerClassAll('active', '.size.radio');
      $(el).addClass('active');
      $(el).children('input').prop("checked", true);
      // console.log($(el).children('input'))
      calcArray.sizes.cost = parseFloat($(el).children('input').val());
      calcArray.sizes.value = parseFloat($(el).children('input').data('value'));
      // console.log(calcArray)
    }
  })
});

$('.calcPage .kladka .input label').each((i, el)=>{
  $(el).click(()=>{
    removerClassAll('active', '.calcPage .kladka .left .item');
    $('.calcPage .kladka .left .item').eq(i).addClass('active')
    calcArray.kladka = parseFloat($(el).data('value'));
  })
})
$('.calcPage .tolshina input').keyup((e)=>{
  calcArray.tolshina[0].width = parseFloat($(e.currentTarget).val());
});

function calced() {
  let tk = parseFloat(calcArray.kladka);
  let rk = parseFloat(calcArray.sizes.value);
  let height = 0;
  let length = 0;
  for (let i = 0; i < calcArray.floors.length; i++) {
    height = parseFloat(height + calcArray.floors[i].height) / 100;
    length = parseFloat(length + calcArray.floors[i].width) / 100;
  }
  let doors = 0;
  let doors2 = 0;
  for (let i = 0; i < calcArray.mirrorOrDoor.length; i++) {
    doors = (parseFloat(doors + (calcArray.mirrorOrDoor[i].width / 100)) * calcArray.mirrorOrDoor[i].count);
    doors2 = (parseFloat(doors2 + (calcArray.mirrorOrDoor[i].height) / 100) * calcArray.mirrorOrDoor[i].count);
  }
  let rez = parseInt(((length * height * tk) - (doors * doors2 * tk)) / rk);
  $(".calcPage .kirpichShtuk").html(rez.format());
  $(".calcPage .kirpichPalet").html(parseInt(rez / $('.inputPalet').val()).format());
  $(".calcPage .kirpichAllCost").html(parseInt(rez * calcArray.sizes.cost).format());
  $(".calcPage .kirpichWess").html(parseInt(rez * $('.calcPage .type .size.radio.active').children('input').data('kg')).format());
}

function showElements() {
  if(calcArray.typeProject == 0){
    // type
    $('.calcPage .type .size.radio').eq(1).css('display','flex');
    // kladka
    $('.kladkaItem').css('display','none');
    calcArray.kladka = parseFloat($('.calcPage .kladka .inputs .input').eq(0).children('label').data('value'));
    $('.calcPage .kladka .inputs .input').eq(0).children('input').prop("checked", true);
  }
  if(calcArray.typeProject == 1){
    // type
    $('.calcPage .type .size.radio').eq(1).css('display','none');
    removerClassAll('active', '.calcPage .type .size.radio');
    $('.calcPage .type .size.radio').eq(0).addClass('active');
    calcArray.sizes.cost = parseFloat($('.calcPage .type .size.radio').children('input').val());
    calcArray.sizes.value = parseFloat($('.calcPage .type .size.radio').children('input').data('value'));
    // kladka
    $('.kladkaItem').css('display','block');
  }
}
Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  // console.log(this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
var miniTimer;
if($('.homePage .block3').length != 0){
  miniTimer = setInterval(()=>{
    let tk = parseFloat(0.12);
    let rk = parseFloat($('.homePage .block3 .size.radio.active').children('input').data('value'));
    let height = 0;
    let length = 0;
    let doors = 0;
    let doors2 = 0;
    if(parseInt($('.homePage .block3 .IWR .se').val()) != 0) {
      height = parseFloat($('.homePage .block3 .IWR .se').val())
    }
    if(parseInt($('.homePage .block3 .IWR .fi').val()) != 0) {
      length = parseFloat($('.homePage .block3 .IWR .fi').val())
    }
    if(parseInt($('.homePage .block3 .IWR .th').val()) != 0) {
      doors = parseFloat($('.homePage .block3 .IWR .th').val())
    }
    if(parseInt($('.homePage .block3 .IWR .fo').val()) != 0) {
      doors2 = parseFloat($('.homePage .block3 .IWR .fo').val())
    }
    let rez = parseInt(((length * height * tk) - (doors * doors2 * tk)) / rk);
    // rez = parseInt(rez * ())
    $(".homePage .block3 .kirpichShtuk").html(rez.format());
    $(".homePage .block3 .kirpichAllCost").html(parseInt(rez * calcArray.sizes.cost).format());
    // log
    // console.log(calcArray.floors)
  }, 1000);
}
