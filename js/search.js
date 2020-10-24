var sea_list = []
var pages = {
  num: 10,
  page: 1,
  show: 0
}
function search() {
  var sbt = $('#s-ServiceSubType').val()
  var rat = $('#s-OverallRating').val()
  var Prv = $('#s-ProviderManagementType').val()
  var name = $('#s-name').val()
  var sea = $('#s-Suburb').val()
  var pos = $('#s-Postcode').val()
  if (sbt != '--' || rat != '--' || Prv != '--' || sea != '' || pos != '' || name != '') {
    sea_list = []
    pages.page = 1
    pages.show = 0
    var box = $('#search_result')[0]
    box.innerHTML = ''
    for (var i = 0; i < searchlist.length; i++) {
      var flag = false
      if (searchlist[i].ServiceSubType == sbt) {
        flag = true
      } else if (sbt != '--' && sbt != null) {
        continue
      }
      if (searchlist[i].OverallRating == rat) {
        flag = true
      } else if (rat != '--' && rat != null) {
        continue
      }
      if (searchlist[i].ProviderManagementType == Prv) {
        flag = true
      } else if (Prv != '--' && Prv != null) {
        continue
      }
      if (name != '') {
        if (searchlist[i].ServiceName.toUpperCase().indexOf(name.toUpperCase()) > -1) {
          flag = true
        } else {
          continue
        }
      }
      if (sea != '') {
        if (searchlist[i].SuburbTown.toUpperCase().indexOf(sea.toUpperCase()) > -1) {
          flag = true
        } else {
          continue
        }
      }
      if (pos != '') {
        if (searchlist[i].Postcode == pos) {
          flag = true
        } else {
          continue
        }
      }
      if (flag) {
        sea_list.push(searchlist[i])
      }
    }
    if (sea_list.length > 0) {
      createDom()
    } else {
      alert('Sorry！There is no suitable kindergarten recommendation yet!')
    }
  }
}
function createDom() {
  var box = $('#search_result')[0]
  for (var i = 0; i < pages.num; i++) {
    var item = sea_list[pages.num * (pages.page - 1) + i]
    var dom = document.createElement('div')
    dom.innerHTML = `
      <div class="s-list">
        <div class="list-name">${item.ServiceName}</div>
        <div class="list-Address"><span>Address:</span>${item.AddressLine1} ${item.SuburbTown} ${item.Postcode} ${item.AddressState}</div>
        <div class="list-phone"><span>Phone number:</span>${item.ServicePhoneNumber}</div>
        <div class="list-button">
            <div class="s-learn" data-id="${item.field}" onclick="tableBoxShow(this)">
                Learn More
            </div>
            <div class="s-learn" data-id="${item.field}" onclick="mapBoxShow(this)">
                <img src="./img/map.png" class="s-btn-img0" />
                <img src="./img/map1.png" class="s-btn-img1" />
                <span>Get in Touch</span>
            </div>
        </div>
    </div>
    `
    box.append(dom)
    pages.show++
    if (pages.show == sea_list.length) {
      $('#s-more')[0].style.display = 'none'
      break
    } else {
      $('#s-more')[0].style.display = 'block'
    }
  }
}
function showMore() {
  pages.page++
  createDom()
}
function tableBoxClose() {
  $('#s-table')[0].classList.remove('s-close-show')
}
function mapBoxClose() {
  $('#s-map-box')[0].classList.remove('s-close-show')
}
function tableBoxShow(e) {
  var item = findList(e.getAttribute('data-id'))
  var box = $('#s-table')[0]
  box.innerHTML = `
      <div class="s-row">
        <div class="span-l">Service Name</div>
        <div class="span-r">${item.ServiceName}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Provider Name</div>
        <div class="span-r">${item.ProviderName}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Provider Management Type</div>
        <div class="span-r">${item.ProviderManagementType}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Managing Jurisdiction</div>
        <div class="span-r">${item.ManagingJurisdiction}</div>
      </div>
       <div class="s-row">
        <div class="span-l">Service Type</div>
        <div class="span-r">${item.ServiceType}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Service email</div>
        <div class="span-r">${item.ServiceEmail}</div>
      </div>
      <div class="s-row">
        <div class="span-l">PreschoolKindergarten Stand Alone</div>
        <div class="span-r">${item.PreschoolKindergartenStandAlone}</div>
      </div>
      <div class="s-row">
        <div class="span-l">PreschoolKindergarten Part of a School</div>
        <div class="span-r">${item.PreschoolKindergartenPartofaSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC BeforeSchool</div>
        <div class="span-r">${item.OSHCBeforeSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC After School</div>
        <div class="span-r">${item.OSHCAfterSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC Vacation Care</div>
        <div class="span-r">${item.OSHCVacationCare}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Nature Care Other</div>
        <div class="span-r">${item.NatureCareOther}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Long Day Care</div>
        <div class="span-r">${item.LongDayCare}</div>
      </div>
      <div class="s-close" onclick="tableBoxClose()">
        close
      </div>
  `
  box.classList.add('s-close-show')
}
function mapBoxShow(e) {
  var item = findList(e.getAttribute('data-id'))
  initMap(item.ServiceName)
  var box = $('#s-map-box')[0]
  box.classList.add('s-close-show')
}
function findList(id) {
  return sea_list.filter((item) => item.field == id)[0]
}
let map
let service
let infowindow
function initMap(search_name) {
  const sydney = new google.maps.LatLng(40.6976637, -74.1197637)
  infowindow = new google.maps.InfoWindow()
  map = new google.maps.Map(document.getElementById('s-map'), {
    center: sydney,
    zoom: 18
  })
  const request = {
    query: `${search_name}`,
    fields: [
      'name',
      'geometry',
      'formatted_address',
      'place_id',
      'icon',
      'photo',
      'opening_hours',
      'rating'
    ]
  }
  service = new google.maps.places.PlacesService(map)
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i])
      }
      console.log(results[0]);
      map.setCenter(results[0].geometry.location)
    }
  })
}
function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  })
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(`${place.name} <br/> ${place.formatted_address}`)
    infowindow.open(map, this)
  })
}
const questionData=[{
  img:'./img/question/1.png',
  questions:'The RED place is ….',
  answers:['South Australia','Victoria','Western Australia','Queensland'],
  correct:2
},{
  img:'./img/question/2.png',
  questions:'The Letter of Butterfly',
  answers:['C','A','B','F'],
  correct:3
},{
  img:'./img/question/3.png',
  questions:'What is the name of the animal in the picture?',
  answers:['Koala','Kangaroo','Wombat','Platypus'],
  correct:1
},{
  img:'./img/question/4.png',
  questions:'What is this vegetable?',
  answers:['Corn','Broccoli','Carrots','Eggplant'],
  correct:4
},{
  img:'./img/question/5.png',
  questions:'What is the main color in the picture?',
  answers:['Yellow','Purple','Red','Blue'],
  correct:2
}]

function showquest(i){
  var data = questionData[i];
  var box = $('#s-table')[0]
  box.innerHTML = `
        <div class="quest-title">
          Quiz Question
          <span onclick="tableBoxClose()">X</span>
        </div>
         <div class="quest-cont">
          ${data.questions}
        </div>
        <div class="quest-img">
          <img src="${data.img}" alt="">
        </div>
        <div class="quest-button">
          <div class="s-learn s-margin-auto s-que" data-count="1" onclick="answer(this,${i})">${data.answers[0]}</div>
          <div class="s-learn s-margin-auto s-que" data-count="2" onclick="answer(this,${i})">${data.answers[1]}</div>
        </div>
         <div class="quest-button">
          <div class="s-learn s-margin-auto s-que" data-count="3" onclick="answer(this,${i})">${data.answers[2]}</div>
          <div class="s-learn s-margin-auto s-que" data-count="4" onclick="answer(this,${i})">${data.answers[3]}</div>
        </div>`
        box.classList.add('s-close-show')
}
function answer(e,i){
  var item = e.getAttribute('data-count')
  var data = questionData[i];
  if(item==data.correct){
    alert('answer is right')
  }else{
    alert('answer is error')
  }
}