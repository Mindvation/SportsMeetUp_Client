'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

// import {MapView, Geolocation} from 'react-native-baidu-map';
import {MapView, Marker, Polyline} from 'react-native-amap3d'

import NewFieldPage from './NewFieldPage'
import FieldInfoView from './FieldInfoView'
import NewMatchView from './NewMatchView'
import MatchInfo from '../matchInfo/MatchInfo'

var EARTH_RADIUS = 6378137.0;    //单位M  
var PI = Math.PI;  
      
function getRad(d){  
  return d*PI/180.0;  
}  
      
    /** 
     * caculate the great circle distance 
     * @param {Object} lat1 
     * @param {Object} lng1 
     * @param {Object} lat2 
     * @param {Object} lng2 
     */  
    function getGreatCircleDistance(lat1,lng1,lat2,lng2){  
        var radLat1 = getRad(lat1);
        var radLat2 = getRad(lat2);
          
        var a = radLat1 - radLat2;
        var b = getRad(lng1) - getRad(lng2);
          
        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s*EARTH_RADIUS;
        s = Math.round(s*10000)/10000.0;

        return s;
    }  


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.playgrounds = [];
    this.hasInitLocation=false;
    this.centerLocation=null;
    this.userLocation=null;
    this.state = {
      mapCenter: null,
      selectedPlayground:null,
      createGameEnabled: false,
      gameInfoEnabled: false,
      dataReady: false,
      showNewFieldModal: false,
    };
  }

  componentDidMount() {

  }

  createMakerIcon(fieldType) {
  	if (fieldType == 'football') {
  		return <Image source={require('../../res/images/football.png')} />;
  	} else if (fieldType == 'basketball') {
  		return <Image source={require('../../res/images/basketball.png')}/>;
  	} else {
  		return <Image source={require('../../res/images/football.png')} />;
  	}
  }

  renderMarker() {
  	var markers = [];
  	for (let i = this.playgrounds.length - 1; i >= 0; i--) {
  		markers.push(
  		  <Marker
          key={this.playgrounds[i].id}
  		  	infoWindowEnabled={false}
  		  	onPress={() => this._onMarkerClick(i)}
		    icon={() => this.createMakerIcon(this.playgrounds[i].fieldType)}
  			coordinate={{
      			latitude: this.playgrounds[i].gpsLocation.latitude,
      			longitude: this.playgrounds[i].gpsLocation.longitude,
    	}}/>
  			);
  	}
  	return markers.map( (item, index) => {return item;} );
  }

  _onMarkerClick(index) {
  	console.log("_onMarkerClick ", index);
    this.setState({selectedPlayground: this.playgrounds[index],
      createGameEnabled: true,
      gameInfoEnabled: true
    })
  }

  _onLocation(nativeEvent) {
    if (nativeEvent.latitude == 0 || nativeEvent.longitude == 0) {
      return;
    }

    // 用户当前位置
    this.userLocation = {latitude:nativeEvent.latitude, longitude:nativeEvent.longitude};
    console.log(`onLocation ${nativeEvent.latitude}, ${nativeEvent.longitude}`);

    if (!this.hasInitLocation) {
      this.refs.map.animateTo({coordinate:{latitude:nativeEvent.latitude, longitude:nativeEvent.longitude}});
      this.hasInitLocation = true;
      this._getData();
    }
  }

  _onCenterLocationChange(nativeEvent) {
    this.centerLocation={latitude:nativeEvent.latitude, longitude:nativeEvent.longitude};
    console.log("mapCenterChange:", nativeEvent);

    if (this.state.selectedPlayground) {
      // 存在激活的marker
      let dis = getGreatCircleDistance(this.centerLocation.latitude, this.centerLocation.longitude, this.state.selectedPlayground.gpsLocation.latitude, this.state.selectedPlayground.gpsLocation.longitude);
      if (dis > 100) {
        this.setState({
          selectedPlayground: null,
          createGameEnabled:false,
          gameInfoEnabled:false
        });
      }
    } else {
      // 没有激活的marker
    }
  }

  // 查询附近的运动场
  _getData() {
    this.playgrounds = [
    {
      id: 999991,
      filedLocation: '雁塔区某某足球场',
      hasMatches: 'N',
      gpsLocation:{
        latitude: 34.190849,
        longitude: 108.962758,        
      },
      fieldType: 'football'
    },
    {
      id: 999992,
      filedLocation: '雁塔区某某篮球场',
      fieldType: 'basketball',
      hasMatches: 'N',
      gpsLocation:{
        latitude: 34.190862,
        longitude: 108.961862,
      }
    }
    ];
    this.setState({dataReady: true})
  }


  // 创建场地或者场地信息
  _onPressField(fieldInfo) {
    if (fieldInfo) {
      // 显示场地信息
      this.refs.fieldInfoView.visible(true)
    } else {
      // 添加场地
      this.refs.newField._visibleModel(true);
    }
  }

  // 发起比赛
  _onPressCreateGame(fieldInfo) {
    console.log("发起比赛");
    this.refs.newMatchView.visible(true);
  }

  // 比赛信息
  _onPressGameInfo(fieldInfo) {
      const {navigator} = this.props;
          navigator.push({
              component: MatchInfo,
              name: 'MatchInfoPage',
              params:{
              }
          });
  }

  _onPressActionField() {
    // 最近的球场
    if (this.userLocation == null) {
      Alert.alert('正在定位...');
      return;
    }

    if (this.playgrounds.length <= 0) {
      Alert.alert('附近还没有发现运动场');
      return;
    }

    let minIndex = -1;
    let minDis = 0;
    // 离用户最近的运动场
    for (let i = this.playgrounds.length - 1; i >= 0; i--) {
      this.playgrounds[i].gpsLocation
      let dis = getGreatCircleDistance(this.playgrounds[i].gpsLocation.latitude, this.playgrounds[i].gpsLocation.longitude, this.userLocation.latitude, this.userLocation.longitude);
      if (minIndex == -1) {
        minIndex = i;
        minDis = dis;
      } else{
        if (dis < minDis) {
          minIndex = i;
          minDis = dis;
        }
      }
    }
    if (minIndex != -1) {
      this.setState({
        selectedPlayground: this.playgrounds[minIndex],
        createGameEnabled:true,
        gameInfoEnabled:true
      });
      this.refs.map.animateTo({coordinate:{latitude:this.playgrounds[minIndex].gpsLocation.latitude, longitude:this.playgrounds[minIndex].gpsLocation.longitude}})
    }
  }

  _onPressActionMatch() {
    // 最近的比赛
    if (this.userLocation == null) {
      Alert.alert('正在定位...');
      return;
    }

    if (this.playgrounds.length <= 0) {
      Alert.alert('附近还没有发现运动场');
      return;
    }

    let minIndex = -1;
    let minDis = 0;
    // 离用户最近的运动场
    for (let i = this.playgrounds.length - 1; i >= 0; i--) {
      this.playgrounds[i].gpsLocation
      let dis = getGreatCircleDistance(this.playgrounds[i].gpsLocation.latitude, this.playgrounds[i].gpsLocation.longitude, this.userLocation.latitude, this.userLocation.longitude);
      if (minIndex == -1 && this.playgrounds[i].hasMatches == 'Y') {
        minIndex = i;
        minDis = dis;
      } else{
        if (dis < minDis && this.playgrounds[i].hasMatches == 'Y') {
          minIndex = i;
          minDis = dis;
        }
      }
    }
    if (minIndex != -1) {
      this.setState({
        selectedPlayground: this.playgrounds[minIndex],
        createGameEnabled:true,
        gameInfoEnabled:true
      });
      this.refs.map.animateTo({coordinate:{latitude:this.playgrounds[minIndex].gpsLocation.latitude, longitude:this.playgrounds[minIndex].gpsLocation.longitude}})
    } else {
      Alert.alert('附近暂时没有发现比赛');
    }

  }

  _submitNewField(data) {
    // 添加场地提交数据
    this.refs.newField._visibleModel(false);
  }

  _submitNewMatch(data) {
    console.log('提交比赛信息到服务器');
    this.refs.newMatchView.visible(false);
  }

  renderFieldModal(){
    if (this.state.selectedPlayground) return <FieldInfoView ref='fieldInfoView' fieldInfo={this.state.selectedPlayground}/>;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, justifyContent:'center'}}>
          <MapView
          style={styles.map}
          ref='map'
          zoomLevel={16}
          locationEnabled={true}
          showsLocationButton={true}
          onLocation={({nativeEvent}) => this._onLocation(nativeEvent)}
          showsTraffic={false}
          rotateEnabled={false}
          tiltEnabled={false}
          showsCompass={false}
          onStatusChange={()=>console.log('onStatusChange')}
          onStatusChangeComplete={({nativeEvent})=>this._onCenterLocationChange(nativeEvent)}
          onPress={({value}) => console.log(value)}
          >
            {this.renderMarker()}
          </MapView>
          <Image style={{position:'absolute', alignSelf:'center'}} source={require('../../res/images/center.png')}/>
        </View>
      	<View style={styles.info}>
      	  <View style={{flexDirection:'row', alignItems:'center', padding:20}}>
      	  	<Image source={require('../../res/images/location.png')}/>
	      	  <Text style={styles.fieldTitle} numberOfLines={1}>{ this.state.selectedPlayground ? this.state.selectedPlayground.filedLocation : '正在获取位置'}</Text>
      	  </View>
      	  <View style={styles.line}/>
      	  <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {this._onPressField(this.state.selectedPlayground);}}>
              <Image source={this.state.selectedPlayground ? require('../../res/images/field_info.png') : require('../../res/images/add_field.png')}/>
              <Text style={styles.buttonText}>{this.state.selectedPlayground ? '场地信息' : '添加场地'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              disabled={!this.state.createGameEnabled}
              onPress={() => {this._onPressCreateGame(this.state.selectedPlayground);}}>
              <Image source={this.state.createGameEnabled ? require('../../res/images/create_game_normal.png') : require('../../res/images/create_game_diable.png')}/>
              <Text style={styles.buttonText}>发起比赛</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              disabled={false}
              onPress={() => {this._onPressGameInfo(this.state.selectedPlayground);}}>
              <Image source={this.state.gameInfoEnabled ? require('../../res/images/game_info_normal.png') : require('../../res/images/game_info_disable.png')}/>
              <Text style={styles.buttonText}>比赛信息</Text>
            </TouchableOpacity>
      	  </View>
      	</View>
      	<View style={styles.floatContainer}>
          <TouchableOpacity
            onPress={() => {this._onPressActionField()}}>
            <Image source={require('../../res/images/action_field.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop:20}}
            onPress={() => {this._onPressActionMatch();}}>
            <Image source={require('../../res/images/action_match.png')}/>
          </TouchableOpacity>
      	</View>
        <NewFieldPage ref='newField' visible={true} commitCallback={(data) => this._submitNewField(data)}/>
        {this.renderFieldModal()}
        <NewMatchView ref='newMatchView' newMatchCallback={(data) => this._submitNewMatch(data)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	map:{
		flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0000ff'
	},
	line:{
	  	height:1,
	  	backgroundColor:'#f1f1f1'
	},
	info:{
		backgroundColor: "#ffffff",
		paddingHorizontal:16,
	},
	buttonContainer:{
		flexDirection:'row',
		justifyContent:'space-around',
		marginTop:18,
		marginBottom:25
	},
	button:{
		flexDirection:'column',
		alignItems:'center'
	},
	buttonText:{
		marginTop:4,
		color:'#c2bfbf',
		fontSize:10
	},
	floatContainer: {
		position:'absolute',
		alignSelf:'flex-end',
		paddingRight: 14,
		paddingTop:20,
		paddingBottom:20,
	},
	fieldTitle: {
		marginLeft:16,
		fontSize:18,
		fontWeight:'bold'
	}
});


export default HomePage;