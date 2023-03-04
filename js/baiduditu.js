//创建和初始化地图函数：
function initMap(){
createMap();//创建地图
setMapEvent();//设置地图事件
addMapControl();//向地图添加控件
addMapOverlay();//向地图添加覆盖物
}
function createMap(){
map = new BMap.Map("map");
map.centerAndZoom(new BMap.Point(98.522145,40.026984),5);
}
function setMapEvent(){
map.enableScrollWheelZoom();
map.enableKeyboard();
map.enableDragging();
map.enableDoubleClickZoom()
}
function addClickHandler(target,window){
target.addEventListener("click",function(){
target.openInfoWindow(window);
});
}
function addMapOverlay(){
var markers = [
{content:"额济纳旗胡杨林5A级国家自然景区生而三千年不死死而三千年不倒，倒而三千年不朽，三千年的守候只为等待你的到来<a target='_blank' href='/xiance/20221219/'>查看照片</a>",title:"胡杨林",imageOffset: {width:-115,height:-21},position:{lat:41.923126,lng:100.275194}},
{content:"谢杨结婚<a target='_blank' href='/about/'>查看照片</a>",title:"四川",imageOffset: {width:-115,height:-21},position:{lat:34.746051,lng:104.911313}}
];
for(var index = 0; index < markers.length; index++ ){
var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
var marker = new BMap.Marker(point,{icon:new BMap.Icon("https://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
})});
var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
var opts = {
width: 200,
title: markers[index].title,
enableMessage: false
};
var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
marker.setLabel(label);
addClickHandler(marker,infoWindow);
map.addOverlay(marker);
};
var labels = [
{position:{lng:97.258037,lat:44.136319},content:"我的全国旅游足迹走过的地方"}
];
for(var index = 0; index < labels.length; index++){
var opt = { position: new BMap.Point(labels[index].position.lng,labels[index].position.lat )};
var label = new BMap.Label(labels[index].content,opt);
map.addOverlay(label);
};
}
//向地图添加控件
function addMapControl(){
var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
map.addControl(scaleControl);
var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:3});
map.addControl(navControl);
var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:false});
map.addControl(overviewControl);
}
var map;
initMap();