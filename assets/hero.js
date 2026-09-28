(()=>{var{defineProperty:m6,getOwnPropertyNames:zZ,getOwnPropertyDescriptor:AZ}=Object,wZ=Object.prototype.hasOwnProperty;function CZ(J){return this[J]}var _Z=(J)=>{var Q=(K$??=new WeakMap).get(J),$;if(Q)return Q;if(Q=m6({},"__esModule",{value:!0}),J&&typeof J==="object"||typeof J==="function"){for(var W of zZ(J))if(!wZ.call(Q,W))m6(Q,W,{get:CZ.bind(J,W),enumerable:!($=AZ(J,W))||$.enumerable})}return K$.set(J,Q),Q},K$;var PZ=(J)=>J;function TZ(J,Q){this[J]=PZ.bind(null,Q)}var SZ=(J,Q)=>{for(var $ in Q)m6(J,$,{get:Q[$],enumerable:!0,configurable:!0,set:TZ.bind(Q,$)})};var WG={};SZ(WG,{posterPosition:()=>OZ,initHero:()=>RZ});var C$="186";var _$=0,N7=1,P$=2;var A9=1,T$=2,U9=3,G9=0,TJ=1,tJ=2,eJ=0,w9=1,E7=2,q7=3,D7=4,S$=5;var N9=100,j$=101,y$=102,v$=103,f$=104,h$=200,b$=201,x$=202,g$=203,p$=204,m$=205,l$=206,d$=207,u$=208,c$=209,n$=210,s$=211,i$=212,o$=213,a$=214,r$=0,t$=1,e$=2,F7=3,JW=4,QW=5,$W=6,WW=7,ZW=0,KW=1,HW=2,cJ=0,O7=1,R7=2,M7=3,k7=4,L7=5,V7=6,B7=7;var E9=301,j8=302,U6=303,G6=304,C9=306,YW=1000,N6=1001,XW=1002,z8=1003,UW=1004;var _9=1005;var SJ=1006,E6=1007;var y8=1008;var nJ=1009,GW=1010,NW=1011,P9=1012,I7=1013,A8=1014,E8=1015,J8=1016,z7=1017,A7=1018,q9=1020,EW=35902,qW=35899,DW=1021,FW=1022,Q8=1023,v8=1026,f8=1027,OW=1028,w7=1029,h8=1030,C7=1031;var _7=1033,q6=33776,D6=33777,F6=33778,O6=33779,P7=35840,T7=35841,S7=35842,j7=35843,y7=36196,v7=37492,f7=37496,h7=37488,b7=37489,R6=37490,x7=37491,g7=37808,p7=37809,m7=37810,l7=37811,d7=37812,u7=37813,c7=37814,n7=37815,s7=37816,i7=37817,o7=37818,a7=37819,r7=37820,t7=37821,e7=36492,JQ=36494,QQ=36495,$Q=36283,WQ=36284,M6=36285,ZQ=36286;var KQ=0,RW=1,b8="",MW="srgb",HQ="srgb-linear",YQ="linear",e0="srgb";var kW=512,LW=513,VW=514,k6=515,BW=516,IW=517,L6=518,zW=519;var XQ="300 es",UQ=2000;function jZ(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function yZ(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function z9(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function AW(){let J=z9("canvas");return J.style.display="block",J}var H$={},X9=null;function GQ(...J){let Q="THREE."+J.shift();if(X9)X9("log",Q,...J);else console.log(Q,...J)}function wW(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function P0(...J){J=wW(J);let Q="THREE."+J.shift();if(X9)X9("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function T0(...J){J=wW(J);let Q="THREE."+J.shift();if(X9)X9("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function S8(...J){let Q=J.join(" ");if(Q in H$)return;H$[Q]=!0,P0(...J)}function CW(J,Q,$){return new Promise(function(W,Z){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:Z();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:W()}}setTimeout(K,$)})}var _W={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class q8{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let W=$[J];if(W!==void 0){let Z=W.indexOf(Q);if(Z!==-1)W.splice(Z,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let W=$.slice(0);for(let Z=0,K=W.length;Z<K;Z++)W[Z].call(this,J);J.target=null}}}var LJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var l6=Math.PI/180,X6=180/Math.PI;function T9(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,W=Math.random()*4294967295|0;return(LJ[J&255]+LJ[J>>8&255]+LJ[J>>16&255]+LJ[J>>24&255]+"-"+LJ[Q&255]+LJ[Q>>8&255]+"-"+LJ[Q>>16&15|64]+LJ[Q>>24&255]+"-"+LJ[$&63|128]+LJ[$>>8&255]+"-"+LJ[$>>16&255]+LJ[$>>24&255]+LJ[W&255]+LJ[W>>8&255]+LJ[W>>16&255]+LJ[W>>24&255]).toLowerCase()}function g0(J,Q,$){return Math.max(Q,Math.min($,J))}function vZ(J,Q){return(J%Q+Q)%Q}function d6(J,Q,$){return(1-$)*J+$*Q}function k9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function _J(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class p0{static{p0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6],this.y=W[1]*Q+W[4]*$+W[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(g0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),W=Math.sin(Q),Z=this.x-J.x,K=this.y-J.y;return this.x=Z*$-K*W+J.x,this.y=Z*W+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class D8{constructor(J=0,Q=0,$=0,W=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=W}static slerpFlat(J,Q,$,W,Z,K,H){let Y=$[W+0],X=$[W+1],U=$[W+2],E=$[W+3],q=Z[K+0],G=Z[K+1],F=Z[K+2],L=Z[K+3];if(E!==L||Y!==q||X!==G||U!==F){let z=Y*q+X*G+U*F+E*L;if(z<0)q=-q,G=-G,F=-F,L=-L,z=-z;let D=1-H;if(z<0.9995){let N=Math.acos(z),w=Math.sin(N);D=Math.sin(D*N)/w,H=Math.sin(H*N)/w,Y=Y*D+q*H,X=X*D+G*H,U=U*D+F*H,E=E*D+L*H}else{Y=Y*D+q*H,X=X*D+G*H,U=U*D+F*H,E=E*D+L*H;let N=1/Math.sqrt(Y*Y+X*X+U*U+E*E);Y*=N,X*=N,U*=N,E*=N}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=E}static multiplyQuaternionsFlat(J,Q,$,W,Z,K){let H=$[W],Y=$[W+1],X=$[W+2],U=$[W+3],E=Z[K],q=Z[K+1],G=Z[K+2],F=Z[K+3];return J[Q]=H*F+U*E+Y*G-X*q,J[Q+1]=Y*F+U*q+X*E-H*G,J[Q+2]=X*F+U*G+H*q-Y*E,J[Q+3]=U*F-H*E-Y*q-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,W){return this._x=J,this._y=Q,this._z=$,this._w=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:W,_z:Z,_order:K}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(W/2),E=H(Z/2),q=Y($/2),G=Y(W/2),F=Y(Z/2);switch(K){case"XYZ":this._x=q*U*E+X*G*F,this._y=X*G*E-q*U*F,this._z=X*U*F+q*G*E,this._w=X*U*E-q*G*F;break;case"YXZ":this._x=q*U*E+X*G*F,this._y=X*G*E-q*U*F,this._z=X*U*F-q*G*E,this._w=X*U*E+q*G*F;break;case"ZXY":this._x=q*U*E-X*G*F,this._y=X*G*E+q*U*F,this._z=X*U*F+q*G*E,this._w=X*U*E-q*G*F;break;case"ZYX":this._x=q*U*E-X*G*F,this._y=X*G*E+q*U*F,this._z=X*U*F-q*G*E,this._w=X*U*E+q*G*F;break;case"YZX":this._x=q*U*E+X*G*F,this._y=X*G*E+q*U*F,this._z=X*U*F-q*G*E,this._w=X*U*E-q*G*F;break;case"XZY":this._x=q*U*E-X*G*F,this._y=X*G*E-q*U*F,this._z=X*U*F+q*G*E,this._w=X*U*E+q*G*F;break;default:P0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,W=Math.sin($);return this._x=J.x*W,this._y=J.y*W,this._z=J.z*W,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],W=Q[4],Z=Q[8],K=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],E=Q[10],q=$+H+E;if(q>0){let G=0.5/Math.sqrt(q+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(Z-X)*G,this._z=(K-W)*G}else if($>H&&$>E){let G=2*Math.sqrt(1+$-H-E);this._w=(U-Y)/G,this._x=0.25*G,this._y=(W+K)/G,this._z=(Z+X)/G}else if(H>E){let G=2*Math.sqrt(1+H-$-E);this._w=(Z-X)/G,this._x=(W+K)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+E-$-H);this._w=(K-W)/G,this._x=(Z+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(g0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let W=Math.min(1,Q/$);return this.slerp(J,W),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:W,_z:Z,_w:K}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+K*H+W*X-Z*Y,this._y=W*U+K*Y+Z*H-$*X,this._z=Z*U+K*X+$*Y-W*H,this._w=K*U-$*H-W*Y-Z*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:W,_z:Z,_w:K}=J,H=this.dot(J);if(H<0)$=-$,W=-W,Z=-Z,K=-K,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+W*Q,this._z=this._z*Y+Z*Q,this._w=this._w*Y+K*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+W*Q,this._z=this._z*Y+Z*Q,this._w=this._w*Y+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),W=Math.sqrt(1-$),Z=Math.sqrt($);return this.set(W*Math.sin(J),W*Math.cos(J),Z*Math.sin(Q),Z*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class x{static{x.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(Y$.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(Y$.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6]*W,this.y=Z[1]*Q+Z[4]*$+Z[7]*W,this.z=Z[2]*Q+Z[5]*$+Z[8]*W,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements,K=1/(Z[3]*Q+Z[7]*$+Z[11]*W+Z[15]);return this.x=(Z[0]*Q+Z[4]*$+Z[8]*W+Z[12])*K,this.y=(Z[1]*Q+Z[5]*$+Z[9]*W+Z[13])*K,this.z=(Z[2]*Q+Z[6]*$+Z[10]*W+Z[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,W=this.z,Z=J.x,K=J.y,H=J.z,Y=J.w,X=2*(K*W-H*$),U=2*(H*Q-Z*W),E=2*(Z*$-K*Q);return this.x=Q+Y*X+K*E-H*U,this.y=$+Y*U+H*X-Z*E,this.z=W+Y*E+Z*U-K*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*Q+Z[4]*$+Z[8]*W,this.y=Z[1]*Q+Z[5]*$+Z[9]*W,this.z=Z[2]*Q+Z[6]*$+Z[10]*W,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this.z=g0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this.z=g0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:W,z:Z}=J,K=Q.x,H=Q.y,Y=Q.z;return this.x=W*Y-Z*H,this.y=Z*K-$*Y,this.z=$*H-W*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return u6.copy(this).projectOnVector(J),this.sub(u6)}reflect(J){return this.sub(u6.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(g0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,W=this.z-J.z;return Q*Q+$*$+W*W}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let W=Math.sin(Q)*J;return this.x=W*Math.sin($),this.y=Math.cos(Q)*J,this.z=W*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),W=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=W,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var u6=new x,Y$=new D8;class S0{static{S0.prototype.isMatrix3=!0}constructor(J,Q,$,W,Z,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,W,Z,K,H,Y,X)}set(J,Q,$,W,Z,K,H,Y,X){let U=this.elements;return U[0]=J,U[1]=W,U[2]=H,U[3]=Q,U[4]=Z,U[5]=Y,U[6]=$,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,W=Q.elements,Z=this.elements,K=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],E=$[7],q=$[2],G=$[5],F=$[8],L=W[0],z=W[3],D=W[6],N=W[1],w=W[4],y=W[7],V=W[2],I=W[5],A=W[8];return Z[0]=K*L+H*N+Y*V,Z[3]=K*z+H*w+Y*I,Z[6]=K*D+H*y+Y*A,Z[1]=X*L+U*N+E*V,Z[4]=X*z+U*w+E*I,Z[7]=X*D+U*y+E*A,Z[2]=q*L+G*N+F*V,Z[5]=q*z+G*w+F*I,Z[8]=q*D+G*y+F*A,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*K*U-Q*H*X-$*Z*U+$*H*Y+W*Z*X-W*K*Y}invert(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],E=U*K-H*X,q=H*Y-U*Z,G=X*Z-K*Y,F=Q*E+$*q+W*G;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let L=1/F;return J[0]=E*L,J[1]=(W*X-U*$)*L,J[2]=(H*$-W*K)*L,J[3]=q*L,J[4]=(U*Q-W*Y)*L,J[5]=(W*Z-H*Q)*L,J[6]=G*L,J[7]=($*Y-X*Q)*L,J[8]=(K*Q-$*Z)*L,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,W,Z,K,H){let Y=Math.cos(Z),X=Math.sin(Z);return this.set($*Y,$*X,-$*(Y*K+X*H)+K+J,-W*X,W*Y,-W*(-X*K+Y*H)+H+Q,0,0,1),this}scale(J,Q){return S8("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(c6.makeScale(J,Q)),this}rotate(J){return S8("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(c6.makeRotation(-J)),this}translate(J,Q){return S8("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(c6.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let W=0;W<9;W++)if(Q[W]!==$[W])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var c6=new S0,X$=new S0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),U$=new S0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function fZ(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(Z,K,H){if(this.enabled===!1||K===H||!K||!H)return Z;if(this.spaces[K].transfer==="srgb")Z.r=G8(Z.r),Z.g=G8(Z.g),Z.b=G8(Z.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)Z.applyMatrix3(this.spaces[K].toXYZ),Z.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")Z.r=Y9(Z.r),Z.g=Y9(Z.g),Z.b=Y9(Z.b);return Z},workingToColorSpace:function(Z,K){return this.convert(Z,this.workingColorSpace,K)},colorSpaceToWorking:function(Z,K){return this.convert(Z,K,this.workingColorSpace)},getPrimaries:function(Z){return this.spaces[Z].primaries},getTransfer:function(Z){if(Z==="")return"linear";return this.spaces[Z].transfer},getToneMappingMode:function(Z){return this.spaces[Z].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(Z,K=this.workingColorSpace){return Z.fromArray(this.spaces[K].luminanceCoefficients)},define:function(Z){Object.assign(this.spaces,Z)},_getMatrix:function(Z,K,H){return Z.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(Z){return this.spaces[Z].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(Z=this.workingColorSpace){return this.spaces[Z].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(Z,K){return S8("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(Z,K)},toWorkingColorSpace:function(Z,K){return S8("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(Z,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],W=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:W,transfer:"linear",toXYZ:X$,fromXYZ:U$,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:W,transfer:"srgb",toXYZ:X$,fromXYZ:U$,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var x0=fZ();function G8(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function Y9(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var i8;class NQ{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(i8===void 0)i8=z9("canvas");i8.width=J.width,i8.height=J.height;let W=i8.getContext("2d");if(J instanceof ImageData)W.putImageData(J,0,0);else W.drawImage(J,0,0,J.width,J.height);$=i8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=z9("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let W=$.getImageData(0,0,J.width,J.height),Z=W.data;for(let K=0;K<Z.length;K++)Z[K]=G8(Z[K]/255)*255;return $.putImageData(W,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(G8(Q[$]/255)*255);else Q[$]=G8(Q[$]);return{data:Q,width:J.width,height:J.height}}else return P0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var hZ=0;class S9{constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hZ++}),this.uuid=T9(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},W=this.data;if(W!==null){let Z;if(Array.isArray(W)){Z=[];for(let K=0,H=W.length;K<H;K++)if(W[K].isDataTexture)Z.push(n6(W[K].image));else Z.push(n6(W[K]))}else Z=n6(W);$.url=Z}if(!Q)J.images[this.uuid]=$;return $}}function n6(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return NQ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return P0("Texture: Unable to serialize Texture."),{}}var bZ=0,s6=new x;class BJ extends q8{constructor(J=BJ.DEFAULT_IMAGE,Q=BJ.DEFAULT_MAPPING,$=1001,W=1001,Z=1006,K=1008,H=1023,Y=1009,X=BJ.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:bZ++}),this.uuid=T9(),this.name="",this.source=new S9(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=W,this.magFilter=Z,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new p0(0,0),this.repeat=new p0(1,1),this.center=new p0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new S0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(s6).x}get height(){return this.source.getSize(s6).y}get depth(){return this.source.getSize(s6).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){P0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let W=this[Q];if(W===void 0){P0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(W&&$&&(W.isVector2&&$.isVector2))W.copy($);else if(W&&$&&(W.isVector3&&$.isVector3))W.copy($);else if(W&&$&&(W.isMatrix3&&$.isMatrix3))W.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}BJ.DEFAULT_IMAGE=null;BJ.DEFAULT_MAPPING=300;BJ.DEFAULT_ANISOTROPY=1;class HJ{static{HJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,W=1){this.x=J,this.y=Q,this.z=$,this.w=W}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,W){return this.x=J,this.y=Q,this.z=$,this.w=W,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,W=this.z,Z=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*W+K[12]*Z,this.y=K[1]*Q+K[5]*$+K[9]*W+K[13]*Z,this.z=K[2]*Q+K[6]*$+K[10]*W+K[14]*Z,this.w=K[3]*Q+K[7]*$+K[11]*W+K[15]*Z,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,W,Z,K=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],E=Y[8],q=Y[1],G=Y[5],F=Y[9],L=Y[2],z=Y[6],D=Y[10];if(Math.abs(U-q)<0.01&&Math.abs(E-L)<0.01&&Math.abs(F-z)<0.01){if(Math.abs(U+q)<0.1&&Math.abs(E+L)<0.1&&Math.abs(F+z)<0.1&&Math.abs(X+G+D-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let w=(X+1)/2,y=(G+1)/2,V=(D+1)/2,I=(U+q)/4,A=(E+L)/4,C=(F+z)/4;if(w>y&&w>V)if(w<0.01)$=0,W=0.707106781,Z=0.707106781;else $=Math.sqrt(w),W=I/$,Z=A/$;else if(y>V)if(y<0.01)$=0.707106781,W=0,Z=0.707106781;else W=Math.sqrt(y),$=I/W,Z=C/W;else if(V<0.01)$=0.707106781,W=0.707106781,Z=0;else Z=Math.sqrt(V),$=A/Z,W=C/Z;return this.set($,W,Z,Q),this}let N=Math.sqrt((z-F)*(z-F)+(E-L)*(E-L)+(q-U)*(q-U));if(Math.abs(N)<0.001)N=1;return this.x=(z-F)/N,this.y=(E-L)/N,this.z=(q-U)/N,this.w=Math.acos((X+G+D-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this.z=g0(this.z,J.z,Q.z),this.w=g0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this.z=g0(this.z,J,Q),this.w=g0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class EQ extends q8{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new HJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new HJ(0,0,J,Q),this.textures=[];let W={width:J,height:Q,depth:$.depth},Z=new BJ(W),K=$.count;for(let H=0;H<K;H++)this.textures[H]=Z.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveColorBuffer=$.resolveColorBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this.storeMultisampledColorBuffer=$.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=$.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=$.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let W=0,Z=this.textures.length;W<Z;W++)if(this.textures[W].image.width=J,this.textures[W].image.height=Q,this.textures[W].image.depth=$,this.textures[W].isData3DTexture!==!0)this.textures[W].isArrayTexture=this.textures[W].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let W=Object.assign({},J.textures[Q].image);this.textures[Q].source=new S9(W)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let Q=J.depthTexture.clone();Q.renderTarget=null,this.depthTexture=Q}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fJ extends EQ{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class V6 extends BJ{constructor(J=null,Q=1,$=1,W=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class qQ extends BJ{constructor(J=null,Q=1,$=1,W=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class KJ{static{KJ.prototype.isMatrix4=!0}constructor(J,Q,$,W,Z,K,H,Y,X,U,E,q,G,F,L,z){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,W,Z,K,H,Y,X,U,E,q,G,F,L,z)}set(J,Q,$,W,Z,K,H,Y,X,U,E,q,G,F,L,z){let D=this.elements;return D[0]=J,D[4]=Q,D[8]=$,D[12]=W,D[1]=Z,D[5]=K,D[9]=H,D[13]=Y,D[2]=X,D[6]=U,D[10]=E,D[14]=q,D[3]=G,D[7]=F,D[11]=L,D[15]=z,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new KJ().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,W=1/o8.setFromMatrixColumn(J,0).length(),Z=1/o8.setFromMatrixColumn(J,1).length(),K=1/o8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*W,Q[1]=$[1]*W,Q[2]=$[2]*W,Q[3]=0,Q[4]=$[4]*Z,Q[5]=$[5]*Z,Q[6]=$[6]*Z,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,W=J.y,Z=J.z,K=Math.cos($),H=Math.sin($),Y=Math.cos(W),X=Math.sin(W),U=Math.cos(Z),E=Math.sin(Z);if(J.order==="XYZ"){let q=K*U,G=K*E,F=H*U,L=H*E;Q[0]=Y*U,Q[4]=-Y*E,Q[8]=X,Q[1]=G+F*X,Q[5]=q-L*X,Q[9]=-H*Y,Q[2]=L-q*X,Q[6]=F+G*X,Q[10]=K*Y}else if(J.order==="YXZ"){let q=Y*U,G=Y*E,F=X*U,L=X*E;Q[0]=q+L*H,Q[4]=F*H-G,Q[8]=K*X,Q[1]=K*E,Q[5]=K*U,Q[9]=-H,Q[2]=G*H-F,Q[6]=L+q*H,Q[10]=K*Y}else if(J.order==="ZXY"){let q=Y*U,G=Y*E,F=X*U,L=X*E;Q[0]=q-L*H,Q[4]=-K*E,Q[8]=F+G*H,Q[1]=G+F*H,Q[5]=K*U,Q[9]=L-q*H,Q[2]=-K*X,Q[6]=H,Q[10]=K*Y}else if(J.order==="ZYX"){let q=K*U,G=K*E,F=H*U,L=H*E;Q[0]=Y*U,Q[4]=F*X-G,Q[8]=q*X+L,Q[1]=Y*E,Q[5]=L*X+q,Q[9]=G*X-F,Q[2]=-X,Q[6]=H*Y,Q[10]=K*Y}else if(J.order==="YZX"){let q=K*Y,G=K*X,F=H*Y,L=H*X;Q[0]=Y*U,Q[4]=L-q*E,Q[8]=F*E+G,Q[1]=E,Q[5]=K*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=G*E+F,Q[10]=q-L*E}else if(J.order==="XZY"){let q=K*Y,G=K*X,F=H*Y,L=H*X;Q[0]=Y*U,Q[4]=-E,Q[8]=X*U,Q[1]=q*E+L,Q[5]=K*U,Q[9]=G*E-F,Q[2]=F*E-G,Q[6]=H*U,Q[10]=L*E+q}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(xZ,J,gZ)}lookAt(J,Q,$){let W=this.elements;if(yJ.subVectors(J,Q),yJ.lengthSq()===0)yJ.z=1;if(yJ.normalize(),M8.crossVectors($,yJ),M8.lengthSq()===0){if(Math.abs($.z)===1)yJ.x+=0.0001;else yJ.z+=0.0001;yJ.normalize(),M8.crossVectors($,yJ)}return M8.normalize(),d9.crossVectors(yJ,M8),W[0]=M8.x,W[4]=d9.x,W[8]=yJ.x,W[1]=M8.y,W[5]=d9.y,W[9]=yJ.y,W[2]=M8.z,W[6]=d9.z,W[10]=yJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,W=Q.elements,Z=this.elements,K=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],E=$[5],q=$[9],G=$[13],F=$[2],L=$[6],z=$[10],D=$[14],N=$[3],w=$[7],y=$[11],V=$[15],I=W[0],A=W[4],C=W[8],M=W[12],B=W[1],l=W[5],v=W[9],f=W[13],r=W[2],S=W[6],d=W[10],o=W[14],m=W[3],Q0=W[7],c=W[11],a=W[15];return Z[0]=K*I+H*B+Y*r+X*m,Z[4]=K*A+H*l+Y*S+X*Q0,Z[8]=K*C+H*v+Y*d+X*c,Z[12]=K*M+H*f+Y*o+X*a,Z[1]=U*I+E*B+q*r+G*m,Z[5]=U*A+E*l+q*S+G*Q0,Z[9]=U*C+E*v+q*d+G*c,Z[13]=U*M+E*f+q*o+G*a,Z[2]=F*I+L*B+z*r+D*m,Z[6]=F*A+L*l+z*S+D*Q0,Z[10]=F*C+L*v+z*d+D*c,Z[14]=F*M+L*f+z*o+D*a,Z[3]=N*I+w*B+y*r+V*m,Z[7]=N*A+w*l+y*S+V*Q0,Z[11]=N*C+w*v+y*d+V*c,Z[15]=N*M+w*f+y*o+V*a,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],W=J[8],Z=J[12],K=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],E=J[6],q=J[10],G=J[14],F=J[3],L=J[7],z=J[11],D=J[15],N=Y*G-X*q,w=H*G-X*E,y=H*q-Y*E,V=K*G-X*U,I=K*q-Y*U,A=K*E-H*U;return Q*(L*N-z*w+D*y)-$*(F*N-z*V+D*I)+W*(F*w-L*V+D*A)-Z*(F*y-L*I+z*A)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],W=J[8],Z=J[1],K=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(K*U-H*X)-$*(Z*U-H*Y)+W*(Z*X-K*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let W=this.elements;if(J.isVector3)W[12]=J.x,W[13]=J.y,W[14]=J.z;else W[12]=J,W[13]=Q,W[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],E=J[9],q=J[10],G=J[11],F=J[12],L=J[13],z=J[14],D=J[15],N=Q*H-$*K,w=Q*Y-W*K,y=Q*X-Z*K,V=$*Y-W*H,I=$*X-Z*H,A=W*X-Z*Y,C=U*L-E*F,M=U*z-q*F,B=U*D-G*F,l=E*z-q*L,v=E*D-G*L,f=q*D-G*z,r=N*f-w*v+y*l+V*B-I*M+A*C;if(r===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/r;return J[0]=(H*f-Y*v+X*l)*S,J[1]=(W*v-$*f-Z*l)*S,J[2]=(L*A-z*I+D*V)*S,J[3]=(q*I-E*A-G*V)*S,J[4]=(Y*B-K*f-X*M)*S,J[5]=(Q*f-W*B+Z*M)*S,J[6]=(z*y-F*A-D*w)*S,J[7]=(U*A-q*y+G*w)*S,J[8]=(K*v-H*B+X*C)*S,J[9]=($*B-Q*v-Z*C)*S,J[10]=(F*I-L*y+D*N)*S,J[11]=(E*y-U*I-G*N)*S,J[12]=(H*M-K*l-Y*C)*S,J[13]=(Q*l-$*M+W*C)*S,J[14]=(L*w-F*V-z*N)*S,J[15]=(U*V-E*w+q*N)*S,this}scale(J){let Q=this.elements,$=J.x,W=J.y,Z=J.z;return Q[0]*=$,Q[4]*=W,Q[8]*=Z,Q[1]*=$,Q[5]*=W,Q[9]*=Z,Q[2]*=$,Q[6]*=W,Q[10]*=Z,Q[3]*=$,Q[7]*=W,Q[11]*=Z,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],W=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,W))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),W=Math.sin(Q),Z=1-$,K=J.x,H=J.y,Y=J.z,X=Z*K,U=Z*H;return this.set(X*K+$,X*H-W*Y,X*Y+W*H,0,X*H+W*Y,U*H+$,U*Y-W*K,0,X*Y-W*H,U*Y+W*K,Z*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,W,Z,K){return this.set(1,$,Z,0,J,1,K,0,Q,W,1,0,0,0,0,1),this}compose(J,Q,$){let W=this.elements,Z=Q._x,K=Q._y,H=Q._z,Y=Q._w,X=Z+Z,U=K+K,E=H+H,q=Z*X,G=Z*U,F=Z*E,L=K*U,z=K*E,D=H*E,N=Y*X,w=Y*U,y=Y*E,V=$.x,I=$.y,A=$.z;return W[0]=(1-(L+D))*V,W[1]=(G+y)*V,W[2]=(F-w)*V,W[3]=0,W[4]=(G-y)*I,W[5]=(1-(q+D))*I,W[6]=(z+N)*I,W[7]=0,W[8]=(F+w)*A,W[9]=(z-N)*A,W[10]=(1-(q+L))*A,W[11]=0,W[12]=J.x,W[13]=J.y,W[14]=J.z,W[15]=1,this}decompose(J,Q,$){let W=this.elements;J.x=W[12],J.y=W[13],J.z=W[14];let Z=this.determinantAffine();if(Z===0)return $.set(1,1,1),Q.identity(),this;let K=o8.set(W[0],W[1],W[2]).length(),H=o8.set(W[4],W[5],W[6]).length(),Y=o8.set(W[8],W[9],W[10]).length();if(Z<0)K=-K;mJ.copy(this);let X=1/K,U=1/H,E=1/Y;return mJ.elements[0]*=X,mJ.elements[1]*=X,mJ.elements[2]*=X,mJ.elements[4]*=U,mJ.elements[5]*=U,mJ.elements[6]*=U,mJ.elements[8]*=E,mJ.elements[9]*=E,mJ.elements[10]*=E,Q.setFromRotationMatrix(mJ),$.x=K,$.y=H,$.z=Y,this}makePerspective(J,Q,$,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2*Z/(Q-J),E=2*Z/($-W),q=(Q+J)/(Q-J),G=($+W)/($-W),F,L;if(Y)F=Z/(K-Z),L=K*Z/(K-Z);else if(H===2000)F=-(K+Z)/(K-Z),L=-2*K*Z/(K-Z);else if(H===2001)F=-K/(K-Z),L=-K*Z/(K-Z);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=q,X[12]=0,X[1]=0,X[5]=E,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=F,X[14]=L,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),E=2/($-W),q=-(Q+J)/(Q-J),G=-($+W)/($-W),F,L;if(Y)F=1/(K-Z),L=K/(K-Z);else if(H===2000)F=-2/(K-Z),L=-(K+Z)/(K-Z);else if(H===2001)F=-1/(K-Z),L=-Z/(K-Z);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=q,X[1]=0,X[5]=E,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=F,X[14]=L,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let W=0;W<16;W++)if(Q[W]!==$[W])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var o8=new x,mJ=new KJ,xZ=new x(0,0,0),gZ=new x(1,1,1),M8=new x,d9=new x,yJ=new x,G$=new KJ,N$=new D8;class N8{constructor(J=0,Q=0,$=0,W=N8.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=W}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,W=this._order){return this._x=J,this._y=Q,this._z=$,this._order=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let W=J.elements,Z=W[0],K=W[4],H=W[8],Y=W[1],X=W[5],U=W[9],E=W[2],q=W[6],G=W[10];switch(Q){case"XYZ":if(this._y=Math.asin(g0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-K,Z);else this._x=Math.atan2(q,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-g0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-E,Z),this._z=0;break;case"ZXY":if(this._x=Math.asin(g0(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(-E,G),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,Z);break;case"ZYX":if(this._y=Math.asin(-g0(E,-1,1)),Math.abs(E)<0.9999999)this._x=Math.atan2(q,G),this._z=Math.atan2(Y,Z);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(g0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-E,Z);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-g0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(q,X),this._y=Math.atan2(H,Z);else this._x=Math.atan2(-U,G),this._y=0;break;default:P0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return G$.makeRotationFromQuaternion(J),this.setFromRotationMatrix(G$,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return N$.setFromEuler(this),this.setFromQuaternion(N$,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}N8.DEFAULT_ORDER="XYZ";class B6{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var pZ=0,E$=new x,a8=new D8,K8=new KJ,u9=new x,L9=new x,mZ=new x,lZ=new D8,q$=new x(1,0,0),D$=new x(0,1,0),F$=new x(0,0,1),O$={type:"added"},dZ={type:"removed"},r8={type:"childadded",child:null},i6={type:"childremoved",child:null};class MJ extends q8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:pZ++}),this.uuid=T9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=MJ.DEFAULT_UP.clone();let J=new x,Q=new N8,$=new D8,W=new x(1,1,1);function Z(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(Z),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:W},modelViewMatrix:{value:new KJ},normalMatrix:{value:new S0}}),this.matrix=new KJ,this.matrixWorld=new KJ,this.matrixAutoUpdate=MJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=MJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new B6,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return a8.setFromAxisAngle(J,Q),this.quaternion.multiply(a8),this}rotateOnWorldAxis(J,Q){return a8.setFromAxisAngle(J,Q),this.quaternion.premultiply(a8),this}rotateX(J){return this.rotateOnAxis(q$,J)}rotateY(J){return this.rotateOnAxis(D$,J)}rotateZ(J){return this.rotateOnAxis(F$,J)}translateOnAxis(J,Q){return E$.copy(J).applyQuaternion(this.quaternion),this.position.add(E$.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(q$,J)}translateY(J){return this.translateOnAxis(D$,J)}translateZ(J){return this.translateOnAxis(F$,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(K8.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)u9.copy(J);else u9.set(J,Q,$);let W=this.parent;if(this.updateWorldMatrix(!0,!1),L9.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)K8.lookAt(L9,u9,this.up);else K8.lookAt(u9,L9,this.up);if(this.quaternion.setFromRotationMatrix(K8),W)K8.extractRotation(W.matrixWorld),a8.setFromRotationMatrix(K8),this.quaternion.premultiply(a8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return T0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(O$),r8.child=J,this.dispatchEvent(r8),r8.child=null;else T0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(dZ),i6.child=J,this.dispatchEvent(i6),i6.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),K8.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),K8.multiply(J.parent.matrixWorld);return J.applyMatrix4(K8),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(O$),r8.child=J,this.dispatchEvent(r8),r8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,W=this.children.length;$<W;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let W=this.children;for(let Z=0,K=W.length;Z<K;Z++)W[Z].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(L9,J,mZ),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(L9,lZ,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:W}=J,Z=this.matrix.elements;Z[12]+=Q-Z[0]*Q-Z[4]*$-Z[8]*W,Z[13]+=$-Z[1]*Q-Z[5]*$-Z[9]*W,Z[14]+=W-Z[2]*Q-Z[6]*$-Z[10]*W}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let W=this.parent;if(J===!0&&W!==null)W.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let Z=this.children;for(let K=0,H=Z.length;K<H;K++)Z[K].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let W={};if(W.uuid=this.uuid,W.type=this.type,W.name=this.name,W.castShadow=this.castShadow,W.receiveShadow=this.receiveShadow,W.visible=this.visible,W.frustumCulled=this.frustumCulled,W.renderOrder=this.renderOrder,W.static=this.static,W.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)W.userData=this.userData;if(W.layers=this.layers.mask,W.matrix=this.matrix.toArray(),W.up=this.up.toArray(),this.pivot!==null)W.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)W.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)W.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(W.type="InstancedMesh",W.count=this.count,W.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)W.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(W.type="BatchedMesh",W.perObjectFrustumCulled=this.perObjectFrustumCulled,W.sortObjects=this.sortObjects,W.drawRanges=this._drawRanges,W.reservedRanges=this._reservedRanges,W.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),W.instanceInfo=this._instanceInfo.map((H)=>({...H})),W.availableInstanceIds=this._availableInstanceIds.slice(),W.availableGeometryIds=this._availableGeometryIds.slice(),W.nextIndexStart=this._nextIndexStart,W.nextVertexStart=this._nextVertexStart,W.geometryCount=this._geometryCount,W.maxInstanceCount=this._maxInstanceCount,W.maxVertexCount=this._maxVertexCount,W.maxIndexCount=this._maxIndexCount,W.geometryInitialized=this._geometryInitialized,W.matricesTexture=this._matricesTexture.toJSON(J),W.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)W.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)W.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)W.boundingBox=this.boundingBox.toJSON()}function Z(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)W.background=this.background.toJSON();else if(this.background.isTexture)W.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)W.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){W.geometry=Z(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let E=Y[X];Z(J.shapes,E)}else Z(J.shapes,Y)}}if(this.isSkinnedMesh){if(W.bindMode=this.bindMode,W.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)Z(J.skeletons,this.skeleton),W.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(Z(J.materials,this.material[Y]));W.material=H}else W.material=Z(J.materials,this.material);if(this.children.length>0){W.children=[];for(let H=0;H<this.children.length;H++)W.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){W.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];W.animations.push(Z(J.animations,Y))}}if(Q){let H=K(J.geometries),Y=K(J.materials),X=K(J.textures),U=K(J.images),E=K(J.shapes),q=K(J.skeletons),G=K(J.animations),F=K(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(E.length>0)$.shapes=E;if(q.length>0)$.skeletons=q;if(G.length>0)$.animations=G;if(F.length>0)$.nodes=F}return $.object=W,$;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let W=J.children[$];this.add(W.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}MJ.DEFAULT_UP=new x(0,1,0);MJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;MJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class I8 extends MJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var uZ={type:"move"};class j9{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new I8,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new I8,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new x,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new x;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new I8,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new x,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new x,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let W=null,Z=null,K=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){K=!0;for(let L of J.hand.values()){let z=Q.getJointPose(L,$),D=this._getHandJoint(X,L);if(z!==null)D.matrix.fromArray(z.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=z.radius;D.visible=z!==null}let U=X.joints["index-finger-tip"],E=X.joints["thumb-tip"],q=U.position.distanceTo(E.position),G=0.02,F=0.005;if(X.inputState.pinching&&q>G+F)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&q<=G-F)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(Z=Q.getPose(J.gripSpace,$),Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(W=Q.getPose(J.targetRaySpace,$),W===null&&Z!==null)W=Z;if(W!==null){if(H.matrix.fromArray(W.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,W.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(W.linearVelocity);else H.hasLinearVelocity=!1;if(W.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(W.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(uZ)}}}if(H!==null)H.visible=W!==null;if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new I8;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var PW={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},k8={h:0,s:0,l:0},c9={h:0,s:0,l:0};function o6(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class m0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let W=J;if(W&&W.isColor)this.copy(W);else if(typeof W==="number")this.setHex(W);else if(typeof W==="string")this.setStyle(W)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,x0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,W=x0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,x0.colorSpaceToWorking(this,W),this}setHSL(J,Q,$,W=x0.workingColorSpace){if(J=vZ(J,1),Q=g0(Q,0,1),$=g0($,0,1),Q===0)this.r=this.g=this.b=$;else{let Z=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-Z;this.r=o6(K,Z,J+0.3333333333333333),this.g=o6(K,Z,J),this.b=o6(K,Z,J-0.3333333333333333)}return x0.colorSpaceToWorking(this,W),this}setStyle(J,Q="srgb"){function $(Z){if(Z===void 0)return;if(parseFloat(Z)<1)P0("Color: Alpha component of "+J+" will be ignored.")}let W;if(W=/^(\w+)\(([^\)]*)\)/.exec(J)){let Z,K=W[1],H=W[2];switch(K){case"rgb":case"rgba":if(Z=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setRGB(Math.min(255,parseInt(Z[1],10))/255,Math.min(255,parseInt(Z[2],10))/255,Math.min(255,parseInt(Z[3],10))/255,Q);if(Z=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setRGB(Math.min(100,parseInt(Z[1],10))/100,Math.min(100,parseInt(Z[2],10))/100,Math.min(100,parseInt(Z[3],10))/100,Q);break;case"hsl":case"hsla":if(Z=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setHSL(parseFloat(Z[1])/360,parseFloat(Z[2])/100,parseFloat(Z[3])/100,Q);break;default:P0("Color: Unknown color model "+J)}}else if(W=/^\#([A-Fa-f\d]+)$/.exec(J)){let Z=W[1],K=Z.length;if(K===3)return this.setRGB(parseInt(Z.charAt(0),16)/15,parseInt(Z.charAt(1),16)/15,parseInt(Z.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(Z,16),Q);else P0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=PW[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else P0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=G8(J.r),this.g=G8(J.g),this.b=G8(J.b),this}copyLinearToSRGB(J){return this.r=Y9(J.r),this.g=Y9(J.g),this.b=Y9(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return x0.workingToColorSpace(VJ.copy(this),J),Math.round(g0(VJ.r*255,0,255))*65536+Math.round(g0(VJ.g*255,0,255))*256+Math.round(g0(VJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=x0.workingColorSpace){x0.workingToColorSpace(VJ.copy(this),Q);let{r:$,g:W,b:Z}=VJ,K=Math.max($,W,Z),H=Math.min($,W,Z),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let E=K-H;switch(X=U<=0.5?E/(K+H):E/(2-K-H),K){case $:Y=(W-Z)/E+(W<Z?6:0);break;case W:Y=(Z-$)/E+2;break;case Z:Y=($-W)/E+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=x0.workingColorSpace){return x0.workingToColorSpace(VJ.copy(this),Q),J.r=VJ.r,J.g=VJ.g,J.b=VJ.b,J}getStyle(J="srgb"){x0.workingToColorSpace(VJ.copy(this),J);let{r:Q,g:$,b:W}=VJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${W.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(W*255)})`}offsetHSL(J,Q,$){return this.getHSL(k8),this.setHSL(k8.h+J,k8.s+Q,k8.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(k8),J.getHSL(c9);let $=d6(k8.h,c9.h,Q),W=d6(k8.s,c9.s,Q),Z=d6(k8.l,c9.l,Q);return this.setHSL($,W,Z),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,W=this.b,Z=J.elements;return this.r=Z[0]*Q+Z[3]*$+Z[6]*W,this.g=Z[1]*Q+Z[4]*$+Z[7]*W,this.b=Z[2]*Q+Z[5]*$+Z[8]*W,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var VJ=new m0;m0.NAMES=PW;class I6 extends MJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new N8,this.environmentIntensity=1,this.environmentRotation=new N8,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();return Q.object.backgroundBlurriness=this.backgroundBlurriness,Q.object.backgroundIntensity=this.backgroundIntensity,Q.object.backgroundRotation=this.backgroundRotation.toArray(),Q.object.environmentIntensity=this.environmentIntensity,Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var lJ=new x,H8=new x,a6=new x,Y8=new x,t8=new x,e8=new x,R$=new x,r6=new x,t6=new x,e6=new x,J7=new HJ,Q7=new HJ,$7=new HJ;class xJ{constructor(J=new x,Q=new x,$=new x){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,W){W.subVectors($,Q),lJ.subVectors(J,Q),W.cross(lJ);let Z=W.lengthSq();if(Z>0)return W.multiplyScalar(1/Math.sqrt(Z));return W.set(0,0,0)}static getBarycoord(J,Q,$,W,Z){lJ.subVectors(W,Q),H8.subVectors($,Q),a6.subVectors(J,Q);let K=lJ.dot(lJ),H=lJ.dot(H8),Y=lJ.dot(a6),X=H8.dot(H8),U=H8.dot(a6),E=K*X-H*H;if(E===0)return Z.set(0,0,0),null;let q=1/E,G=(X*Y-H*U)*q,F=(K*U-H*Y)*q;return Z.set(1-G-F,F,G)}static containsPoint(J,Q,$,W){if(this.getBarycoord(J,Q,$,W,Y8)===null)return!1;return Y8.x>=0&&Y8.y>=0&&Y8.x+Y8.y<=1}static getInterpolation(J,Q,$,W,Z,K,H,Y){if(this.getBarycoord(J,Q,$,W,Y8)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(Z,Y8.x),Y.addScaledVector(K,Y8.y),Y.addScaledVector(H,Y8.z),Y}static getInterpolatedAttribute(J,Q,$,W,Z,K){return J7.setScalar(0),Q7.setScalar(0),$7.setScalar(0),J7.fromBufferAttribute(J,Q),Q7.fromBufferAttribute(J,$),$7.fromBufferAttribute(J,W),K.setScalar(0),K.addScaledVector(J7,Z.x),K.addScaledVector(Q7,Z.y),K.addScaledVector($7,Z.z),K}static isFrontFacing(J,Q,$,W){return lJ.subVectors($,Q),H8.subVectors(J,Q),lJ.cross(H8).dot(W)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,W){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[W]),this}setFromAttributeAndIndices(J,Q,$,W){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,W),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return lJ.subVectors(this.c,this.b),H8.subVectors(this.a,this.b),lJ.cross(H8).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return xJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return xJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,W,Z){return xJ.getInterpolation(J,this.a,this.b,this.c,Q,$,W,Z)}containsPoint(J){return xJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return xJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,W=this.b,Z=this.c,K,H;t8.subVectors(W,$),e8.subVectors(Z,$),r6.subVectors(J,$);let Y=t8.dot(r6),X=e8.dot(r6);if(Y<=0&&X<=0)return Q.copy($);t6.subVectors(J,W);let U=t8.dot(t6),E=e8.dot(t6);if(U>=0&&E<=U)return Q.copy(W);let q=Y*E-U*X;if(q<=0&&Y>=0&&U<=0)return K=Y/(Y-U),Q.copy($).addScaledVector(t8,K);e6.subVectors(J,Z);let G=t8.dot(e6),F=e8.dot(e6);if(F>=0&&G<=F)return Q.copy(Z);let L=G*X-Y*F;if(L<=0&&X>=0&&F<=0)return H=X/(X-F),Q.copy($).addScaledVector(e8,H);let z=U*F-G*E;if(z<=0&&E-U>=0&&G-F>=0)return R$.subVectors(Z,W),H=(E-U)/(E-U+(G-F)),Q.copy(W).addScaledVector(R$,H);let D=1/(z+L+q);return K=L*D,H=q*D,Q.copy($).addScaledVector(t8,K).addScaledVector(e8,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class x8{constructor(J=new x(1/0,1/0,1/0),Q=new x(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(dJ.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(dJ.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=dJ.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let Z=$.getAttribute("position");if(Q===!0&&Z!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=Z.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,dJ);else dJ.fromBufferAttribute(Z,K);dJ.applyMatrix4(J.matrixWorld),this.expandByPoint(dJ)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();n9.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();n9.copy($.boundingBox)}n9.applyMatrix4(J.matrixWorld),this.union(n9)}}let W=J.children;for(let Z=0,K=W.length;Z<K;Z++)this.expandByObject(W[Z],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,dJ),dJ.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(V9),s9.subVectors(this.max,V9),J9.subVectors(J.a,V9),Q9.subVectors(J.b,V9),$9.subVectors(J.c,V9),L8.subVectors(Q9,J9),V8.subVectors($9,Q9),C8.subVectors(J9,$9);let Q=[0,-L8.z,L8.y,0,-V8.z,V8.y,0,-C8.z,C8.y,L8.z,0,-L8.x,V8.z,0,-V8.x,C8.z,0,-C8.x,-L8.y,L8.x,0,-V8.y,V8.x,0,-C8.y,C8.x,0];if(!W7(Q,J9,Q9,$9,s9))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!W7(Q,J9,Q9,$9,s9))return!1;return i9.crossVectors(L8,V8),Q=[i9.x,i9.y,i9.z],W7(Q,J9,Q9,$9,s9)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,dJ).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(dJ).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return X8[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),X8[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),X8[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),X8[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),X8[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),X8[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),X8[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),X8[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(X8),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var X8=[new x,new x,new x,new x,new x,new x,new x,new x],dJ=new x,n9=new x8,J9=new x,Q9=new x,$9=new x,L8=new x,V8=new x,C8=new x,V9=new x,s9=new x,i9=new x,_8=new x;function W7(J,Q,$,W,Z){for(let K=0,H=J.length-3;K<=H;K+=3){_8.fromArray(J,K);let Y=Z.x*Math.abs(_8.x)+Z.y*Math.abs(_8.y)+Z.z*Math.abs(_8.z),X=Q.dot(_8),U=$.dot(_8),E=W.dot(_8);if(Math.max(-Math.max(X,U,E),Math.min(X,U,E))>Y)return!1}return!0}var GJ=new x,o9=new p0,cZ=0;class uJ extends q8{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cZ++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let W=0,Z=this.itemSize;W<Z;W++)this.array[J+W]=Q.array[$+W];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)o9.fromBufferAttribute(this,Q),o9.applyMatrix3(J),this.setXY(Q,o9.x,o9.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)GJ.fromBufferAttribute(this,Q),GJ.applyMatrix3(J),this.setXYZ(Q,GJ.x,GJ.y,GJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)GJ.fromBufferAttribute(this,Q),GJ.applyMatrix4(J),this.setXYZ(Q,GJ.x,GJ.y,GJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)GJ.fromBufferAttribute(this,Q),GJ.applyNormalMatrix(J),this.setXYZ(Q,GJ.x,GJ.y,GJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)GJ.fromBufferAttribute(this,Q),GJ.transformDirection(J),this.setXYZ(Q,GJ.x,GJ.y,GJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=k9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=_J($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=k9(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=_J(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=k9(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=_J(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=k9(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=_J(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=k9(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=_J(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=_J(Q,this.array),$=_J($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,W){if(J*=this.itemSize,this.normalized)Q=_J(Q,this.array),$=_J($,this.array),W=_J(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=W,this}setXYZW(J,Q,$,W,Z){if(J*=this.itemSize,this.normalized)Q=_J(Q,this.array),$=_J($,this.array),W=_J(W,this.array),Z=_J(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=W,this.array[J+3]=Z,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class z6 extends uJ{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class A6 extends uJ{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class PJ extends uJ{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var nZ=new x8,B9=new x,Z7=new x;class y9{constructor(J=new x,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else nZ.setFromPoints(J).getCenter($);let W=0;for(let Z=0,K=J.length;Z<K;Z++)W=Math.max(W,$.distanceToSquared(J[Z]));return this.radius=Math.sqrt(W),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;B9.subVectors(J,this.center);let Q=B9.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),W=($-this.radius)*0.5;this.center.addScaledVector(B9,W/$),this.radius+=W}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else Z7.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(B9.copy(J.center).add(Z7)),this.expandByPoint(B9.copy(J.center).sub(Z7));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var sZ=0,bJ=new KJ,K7=new MJ,W9=new x,vJ=new x8,I9=new x8,OJ=new x;class sJ extends q8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sZ++}),this.uuid=T9(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((jZ(J))?A6:z6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let Z=new S0().getNormalMatrix(J);$.applyNormalMatrix(Z),$.needsUpdate=!0}let W=this.attributes.tangent;if(W!==void 0)W.transformDirection(J),W.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return bJ.makeRotationFromQuaternion(J),this.applyMatrix4(bJ),this}rotateX(J){return bJ.makeRotationX(J),this.applyMatrix4(bJ),this}rotateY(J){return bJ.makeRotationY(J),this.applyMatrix4(bJ),this}rotateZ(J){return bJ.makeRotationZ(J),this.applyMatrix4(bJ),this}translate(J,Q,$){return bJ.makeTranslation(J,Q,$),this.applyMatrix4(bJ),this}scale(J,Q,$){return bJ.makeScale(J,Q,$),this.applyMatrix4(bJ),this}lookAt(J){return K7.lookAt(J),K7.updateMatrix(),this.applyMatrix4(K7.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(W9).negate(),this.translate(W9.x,W9.y,W9.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let W=0,Z=J.length;W<Z;W++){let K=J[W];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new PJ($,3))}else{let $=Math.min(J.length,Q.count);for(let W=0;W<$;W++){let Z=J[W];Q.setXYZ(W,Z.x,Z.y,Z.z||0)}if(J.length>Q.count)P0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new x8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){T0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new x(-1/0,-1/0,-1/0),new x(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,W=Q.length;$<W;$++){let Z=Q[$];if(vJ.setFromBufferAttribute(Z),this.morphTargetsRelative)OJ.addVectors(this.boundingBox.min,vJ.min),this.boundingBox.expandByPoint(OJ),OJ.addVectors(this.boundingBox.max,vJ.max),this.boundingBox.expandByPoint(OJ);else this.boundingBox.expandByPoint(vJ.min),this.boundingBox.expandByPoint(vJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))T0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new y9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){T0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new x,1/0);return}if(J){let $=this.boundingSphere.center;if(vJ.setFromBufferAttribute(J),Q)for(let Z=0,K=Q.length;Z<K;Z++){let H=Q[Z];if(I9.setFromBufferAttribute(H),this.morphTargetsRelative)OJ.addVectors(vJ.min,I9.min),vJ.expandByPoint(OJ),OJ.addVectors(vJ.max,I9.max),vJ.expandByPoint(OJ);else vJ.expandByPoint(I9.min),vJ.expandByPoint(I9.max)}vJ.getCenter($);let W=0;for(let Z=0,K=J.count;Z<K;Z++)OJ.fromBufferAttribute(J,Z),W=Math.max(W,$.distanceToSquared(OJ));if(Q)for(let Z=0,K=Q.length;Z<K;Z++){let H=Q[Z],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(OJ.fromBufferAttribute(H,X),Y)W9.fromBufferAttribute(J,X),OJ.add(W9);W=Math.max(W,$.distanceToSquared(OJ))}}if(this.boundingSphere.radius=Math.sqrt(W),isNaN(this.boundingSphere.radius))T0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){T0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:W,uv:Z}=Q,K=this.getAttribute("tangent");if(K===void 0||K.count!==$.count)K=new uJ(new Float32Array(4*$.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let C=0;C<$.count;C++)H[C]=new x,Y[C]=new x;let X=new x,U=new x,E=new x,q=new p0,G=new p0,F=new p0,L=new x,z=new x;function D(C,M,B){X.fromBufferAttribute($,C),U.fromBufferAttribute($,M),E.fromBufferAttribute($,B),q.fromBufferAttribute(Z,C),G.fromBufferAttribute(Z,M),F.fromBufferAttribute(Z,B),U.sub(X),E.sub(X),G.sub(q),F.sub(q);let l=1/(G.x*F.y-F.x*G.y);if(!isFinite(l))return;L.copy(U).multiplyScalar(F.y).addScaledVector(E,-G.y).multiplyScalar(l),z.copy(E).multiplyScalar(G.x).addScaledVector(U,-F.x).multiplyScalar(l),H[C].add(L),H[M].add(L),H[B].add(L),Y[C].add(z),Y[M].add(z),Y[B].add(z)}let N=this.groups;if(N.length===0)N=[{start:0,count:J.count}];for(let C=0,M=N.length;C<M;++C){let B=N[C],l=B.start,v=B.count;for(let f=l,r=l+v;f<r;f+=3)D(J.getX(f+0),J.getX(f+1),J.getX(f+2))}let w=new x,y=new x,V=new x,I=new x;function A(C){V.fromBufferAttribute(W,C),I.copy(V);let M=H[C];w.copy(M),w.sub(V.multiplyScalar(V.dot(M))).normalize(),y.crossVectors(I,M);let l=y.dot(Y[C])<0?-1:1;K.setXYZW(C,w.x,w.y,w.z,l)}for(let C=0,M=N.length;C<M;++C){let B=N[C],l=B.start,v=B.count;for(let f=l,r=l+v;f<r;f+=3)A(J.getX(f+0)),A(J.getX(f+1)),A(J.getX(f+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new uJ(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let q=0,G=$.count;q<G;q++)$.setXYZ(q,0,0,0);let W=new x,Z=new x,K=new x,H=new x,Y=new x,X=new x,U=new x,E=new x;if(J)for(let q=0,G=J.count;q<G;q+=3){let F=J.getX(q+0),L=J.getX(q+1),z=J.getX(q+2);W.fromBufferAttribute(Q,F),Z.fromBufferAttribute(Q,L),K.fromBufferAttribute(Q,z),U.subVectors(K,Z),E.subVectors(W,Z),U.cross(E),H.fromBufferAttribute($,F),Y.fromBufferAttribute($,L),X.fromBufferAttribute($,z),H.add(U),Y.add(U),X.add(U),$.setXYZ(F,H.x,H.y,H.z),$.setXYZ(L,Y.x,Y.y,Y.z),$.setXYZ(z,X.x,X.y,X.z)}else for(let q=0,G=Q.count;q<G;q+=3)W.fromBufferAttribute(Q,q+0),Z.fromBufferAttribute(Q,q+1),K.fromBufferAttribute(Q,q+2),U.subVectors(K,Z),E.subVectors(W,Z),U.cross(E),$.setXYZ(q+0,U.x,U.y,U.z),$.setXYZ(q+1,U.x,U.y,U.z),$.setXYZ(q+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)OJ.fromBufferAttribute(J,Q),OJ.normalize(),J.setXYZ(Q,OJ.x,OJ.y,OJ.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:E}=H,q=new X.constructor(Y.length*U),G=0,F=0;for(let L=0,z=Y.length;L<z;L++){if(H.isInterleavedBufferAttribute)G=Y[L]*H.data.stride+H.offset;else G=Y[L]*U;for(let D=0;D<U;D++)q[F++]=X[G++]}return new uJ(q,U,E)}if(this.index===null)return P0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new sJ,$=this.index.array,W=this.attributes;for(let H in W){let Y=W[H],X=J(Y,$);Q.setAttribute(H,X)}let Z=this.morphAttributes;for(let H in Z){let Y=[],X=Z[H];for(let U=0,E=X.length;U<E;U++){let q=X[U],G=J(q,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let W={},Z=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let E=0,q=X.length;E<q;E++){let G=X[E];U.push(G.toJSON(J.data))}if(U.length>0)W[Y]=U,Z=!0}if(Z)J.data.morphAttributes=W,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let W=J.attributes;for(let X in W){let U=W[X];this.setAttribute(X,U.clone(Q))}let Z=J.morphAttributes;for(let X in Z){let U=[],E=Z[X];for(let q=0,G=E.length;q<G;q++)U.push(E[q].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let X=0,U=K.length;X<U;X++){let E=K[X];this.addGroup(E.start,E.count,E.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var H7=new x,iZ=new x,oZ=new S0;class rJ{constructor(J=new x(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,W){return this.normal.set(J,Q,$),this.constant=W,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let W=H7.subVectors($,Q).cross(iZ.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(W,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let W=J.delta(H7),Z=this.normal.dot(W);if(Z===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/Z;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(W,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||oZ.getNormalMatrix(J),W=this.coplanarPoint(H7).applyMatrix4(J),Z=this.normal.applyMatrix3($).normalize();return this.constant=-W.dot(Z),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var aZ=0;class g8 extends q8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:aZ++}),this.uuid=T9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new m0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){P0(`Material: parameter '${Q}' has value of undefined.`);continue}let W=this[Q];if(W===void 0){P0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(W&&W.isColor)W.set($);else if(W&&W.isVector2&&($&&$.isVector2)||W&&W.isEuler&&($&&$.isEuler)||W&&W.isVector3&&($&&$.isVector3))W.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,$.blending=this.blending,$.side=this.side,$.shadowSide=this.shadowSide,$.vertexColors=this.vertexColors,$.opacity=this.opacity,$.transparent=this.transparent,$.blendSrc=this.blendSrc,$.blendDst=this.blendDst,$.blendEquation=this.blendEquation,$.blendSrcAlpha=this.blendSrcAlpha,$.blendDstAlpha=this.blendDstAlpha,$.blendEquationAlpha=this.blendEquationAlpha,$.blendColor=this.blendColor.getHex(),$.blendAlpha=this.blendAlpha,$.depthFunc=this.depthFunc,$.depthTest=this.depthTest,$.depthWrite=this.depthWrite,$.colorWrite=this.colorWrite,$.clipIntersection=this.clipIntersection,$.clipShadows=this.clipShadows,$.stencilWriteMask=this.stencilWriteMask,$.stencilFunc=this.stencilFunc,$.stencilRef=this.stencilRef,$.stencilFuncMask=this.stencilFuncMask,$.stencilFail=this.stencilFail,$.stencilZFail=this.stencilZFail,$.stencilZPass=this.stencilZPass,$.stencilWrite=this.stencilWrite,$.polygonOffset=this.polygonOffset,$.polygonOffsetFactor=this.polygonOffsetFactor,$.polygonOffsetUnits=this.polygonOffsetUnits,$.dithering=this.dithering,$.alphaTest=this.alphaTest,$.alphaHash=this.alphaHash,$.alphaToCoverage=this.alphaToCoverage,$.premultipliedAlpha=this.premultipliedAlpha,$.forceSinglePass=this.forceSinglePass,$.allowOverride=this.allowOverride,$.visible=this.visible,$.toneMapped=this.toneMapped,$.name=this.name,this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)$.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)$.clippingPlanes=this.clippingPlanes.map((Z)=>Z.toJSON());if(this.rotation!==void 0)$.rotation=this.rotation;if(this.depthPacking!==void 0)$.depthPacking=this.depthPacking;if(this.linewidth!==void 0)$.linewidth=this.linewidth;if(this.linecap!==void 0)$.linecap=this.linecap;if(this.linejoin!==void 0)$.linejoin=this.linejoin;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.wireframe!==void 0)$.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)$.flatShading=this.flatShading;if(this.fog!==void 0)$.fog=this.fog;if(Object.keys(this.userData).length>0)$.userData=this.userData;function W(Z){let K=[];for(let H in Z){let Y=Z[H];delete Y.metadata,K.push(Y)}return K}if(Q){let Z=W(J.textures),K=W(J.images);if(Z.length>0)$.textures=Z;if(K.length>0)$.images=K}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new m0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map(($)=>new rJ().fromJSON($));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new p0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new p0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let W=Q.length;$=Array(W);for(let Z=0;Z!==W;++Z)$[Z]=Q[Z].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var U8=new x,Y7=new x,a9=new x,r9=new x;class DQ{constructor(J=new x,Q=new x(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,U8)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=U8.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return U8.copy(this.origin).addScaledVector(this.direction,Q),U8.distanceToSquared(J)}distanceSqToSegment(J,Q,$,W){Y7.copy(J).add(Q).multiplyScalar(0.5),a9.copy(Q).sub(J).normalize(),r9.copy(this.origin).sub(Y7);let Z=J.distanceTo(Q)*0.5,K=-this.direction.dot(a9),H=r9.dot(this.direction),Y=-r9.dot(a9),X=r9.lengthSq(),U=Math.abs(1-K*K),E,q,G,F;if(U>0)if(E=K*Y-H,q=K*H-Y,F=Z*U,E>=0)if(q>=-F)if(q<=F){let L=1/U;E*=L,q*=L,G=E*(E+K*q+2*H)+q*(K*E+q+2*Y)+X}else q=Z,E=Math.max(0,-(K*q+H)),G=-E*E+q*(q+2*Y)+X;else q=-Z,E=Math.max(0,-(K*q+H)),G=-E*E+q*(q+2*Y)+X;else if(q<=-F)E=Math.max(0,-(-K*Z+H)),q=E>0?-Z:Math.min(Math.max(-Z,-Y),Z),G=-E*E+q*(q+2*Y)+X;else if(q<=F)E=0,q=Math.min(Math.max(-Z,-Y),Z),G=q*(q+2*Y)+X;else E=Math.max(0,-(K*Z+H)),q=E>0?Z:Math.min(Math.max(-Z,-Y),Z),G=-E*E+q*(q+2*Y)+X;else q=K>0?-Z:Z,E=Math.max(0,-(K*q+H)),G=-E*E+q*(q+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,E);if(W)W.copy(Y7).addScaledVector(a9,q);return G}intersectSphere(J,Q){if(J.radius<0)return null;U8.subVectors(J.center,this.origin);let $=U8.dot(this.direction),W=U8.dot(U8)-$*$,Z=J.radius*J.radius;if(W>Z)return null;let K=Math.sqrt(Z-W),H=$-K,Y=$+K;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,W,Z,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,E=1/this.direction.z,q=this.origin;if(X>=0)$=(J.min.x-q.x)*X,W=(J.max.x-q.x)*X;else $=(J.max.x-q.x)*X,W=(J.min.x-q.x)*X;if(U>=0)Z=(J.min.y-q.y)*U,K=(J.max.y-q.y)*U;else Z=(J.max.y-q.y)*U,K=(J.min.y-q.y)*U;if($>K||Z>W)return null;if(Z>$||isNaN($))$=Z;if(K<W||isNaN(W))W=K;if(E>=0)H=(J.min.z-q.z)*E,Y=(J.max.z-q.z)*E;else H=(J.max.z-q.z)*E,Y=(J.min.z-q.z)*E;if($>Y||H>W)return null;if(H>$||$!==$)$=H;if(Y<W||W!==W)W=Y;if(W<0)return null;return this.at($>=0?$:W,Q)}intersectsBox(J){return this.intersectBox(J,U8)!==null}intersectTriangle(J,Q,$,W,Z){let K=this.origin,H=this.direction,Y=H.x,X=H.y,U=H.z,E=J.x-K.x,q=J.y-K.y,G=J.z-K.z,F=Q.x-K.x,L=Q.y-K.y,z=Q.z-K.z,D=$.x-K.x,N=$.y-K.y,w=$.z-K.z,y=Math.abs(Y),V=Math.abs(X),I=Math.abs(U),A,C,M,B,l,v,f,r,S,d,o,m;if(y>=V&&y>=I)if(M=Y,v=E,S=F,m=D,Y>=0)A=X,C=U,B=q,l=G,f=L,r=z,d=N,o=w;else A=U,C=X,B=G,l=q,f=z,r=L,d=w,o=N;else if(V>=I)if(M=X,v=q,S=L,m=N,X>=0)A=U,C=Y,B=G,l=E,f=z,r=F,d=w,o=D;else A=Y,C=U,B=E,l=G,f=F,r=z,d=D,o=w;else if(M=U,v=G,S=z,m=w,U>=0)A=Y,C=X,B=E,l=q,f=F,r=L,d=D,o=N;else A=X,C=Y,B=q,l=E,f=L,r=F,d=N,o=D;if(M===0)return null;let Q0=A/M,c=C/M,a=1/M,J0=B-Q0*v,C0=l-c*v,z0=f-Q0*S,JJ=r-c*S,f0=d-Q0*m,n=o-c*m,$0=f0*JJ-n*z0,Z0=J0*n-C0*f0,A0=z0*C0-JJ*J0;if(W){if($0<0||Z0<0||A0<0)return null}else if(($0<0||Z0<0||A0<0)&&($0>0||Z0>0||A0>0))return null;let _0=$0+Z0+A0;if(_0===0)return null;let B0=a*($0*v+Z0*S+A0*m);if(_0>0?B0<0:B0>0)return null;return this.at(B0/_0,Z)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class w6 extends g8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new m0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new N8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var M$=new KJ,P8=new DQ,t9=new y9,k$=new x,e9=new x,J6=new x,Q6=new x,X7=new x,$6=new x,L$=new x,W6=new x;class jJ extends MJ{constructor(J=new sJ,Q=new w6){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}getVertexPosition(J,Q){let $=this.geometry,W=$.attributes.position,Z=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(W,J);let H=this.morphTargetInfluences;if(Z&&H){$6.set(0,0,0);for(let Y=0,X=Z.length;Y<X;Y++){let U=H[Y],E=Z[Y];if(U===0)continue;if(X7.fromBufferAttribute(E,J),K)$6.addScaledVector(X7,U);else $6.addScaledVector(X7.sub(Q),U)}Q.add($6)}return Q}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,W=this.material,Z=this.matrixWorld;if(W===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(t9.copy($.boundingSphere),t9.applyMatrix4(Z),P8.copy(J.ray).recast(J.near),t9.containsPoint(P8.origin)===!1){if(P8.intersectSphere(t9,k$)===null)return;if(P8.origin.distanceToSquared(k$)>(J.far-J.near)**2)return}if(M$.copy(Z).invert(),P8.copy(J.ray).applyMatrix4(M$),$.boundingBox!==null){if(P8.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,P8)}_computeIntersections(J,Q,$){let W,Z=this.geometry,K=this.material,H=Z.index,Y=Z.attributes.position,X=Z.attributes.uv,U=Z.attributes.uv1,E=Z.attributes.normal,q=Z.groups,G=Z.drawRange;if(H!==null)if(Array.isArray(K))for(let F=0,L=q.length;F<L;F++){let z=q[F],D=K[z.materialIndex],N=Math.max(z.start,G.start),w=Math.min(H.count,Math.min(z.start+z.count,G.start+G.count));for(let y=N,V=w;y<V;y+=3){let I=H.getX(y),A=H.getX(y+1),C=H.getX(y+2);if(W=Z6(this,D,J,$,X,U,E,I,A,C),W)W.faceIndex=Math.floor(y/3),W.face.materialIndex=z.materialIndex,Q.push(W)}}else{let F=Math.max(0,G.start),L=Math.min(H.count,G.start+G.count);for(let z=F,D=L;z<D;z+=3){let N=H.getX(z),w=H.getX(z+1),y=H.getX(z+2);if(W=Z6(this,K,J,$,X,U,E,N,w,y),W)W.faceIndex=Math.floor(z/3),Q.push(W)}}else if(Y!==void 0)if(Array.isArray(K))for(let F=0,L=q.length;F<L;F++){let z=q[F],D=K[z.materialIndex],N=Math.max(z.start,G.start),w=Math.min(Y.count,Math.min(z.start+z.count,G.start+G.count));for(let y=N,V=w;y<V;y+=3){let I=y,A=y+1,C=y+2;if(W=Z6(this,D,J,$,X,U,E,I,A,C),W)W.faceIndex=Math.floor(y/3),W.face.materialIndex=z.materialIndex,Q.push(W)}}else{let F=Math.max(0,G.start),L=Math.min(Y.count,G.start+G.count);for(let z=F,D=L;z<D;z+=3){let N=z,w=z+1,y=z+2;if(W=Z6(this,K,J,$,X,U,E,N,w,y),W)W.faceIndex=Math.floor(z/3),Q.push(W)}}}}function rZ(J,Q,$,W,Z,K,H,Y){let X;if(Q.side===1)X=W.intersectTriangle(H,K,Z,!0,Y);else X=W.intersectTriangle(Z,K,H,Q.side===0,Y);if(X===null)return null;W6.copy(Y),W6.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(W6);if(U<$.near||U>$.far)return null;return{distance:U,point:W6.clone(),object:J}}function Z6(J,Q,$,W,Z,K,H,Y,X,U){J.getVertexPosition(Y,e9),J.getVertexPosition(X,J6),J.getVertexPosition(U,Q6);let E=rZ(J,Q,$,W,e9,J6,Q6,L$);if(E){let q=new x;if(xJ.getBarycoord(L$,e9,J6,Q6,q),Z)E.uv=xJ.getInterpolatedAttribute(Z,Y,X,U,q,new p0);if(K)E.uv1=xJ.getInterpolatedAttribute(K,Y,X,U,q,new p0);if(H){if(E.normal=xJ.getInterpolatedAttribute(H,Y,X,U,q,new x),E.normal.dot(W.direction)>0)E.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new x,materialIndex:0};xJ.getNormal(e9,J6,Q6,G.normal),E.face=G,E.barycoord=q}return E}class FQ extends BJ{constructor(J=null,Q=1,$=1,W,Z,K,H,Y,X=1003,U=1003,E,q){super(null,K,H,Y,X,U,W,Z,E,q);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var T8=new y9,tZ=new p0(0.5,0.5),K6=new x;class v9{constructor(J=new rJ,Q=new rJ,$=new rJ,W=new rJ,Z=new rJ,K=new rJ){this.planes=[J,Q,$,W,Z,K]}set(J,Q,$,W,Z,K){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(W),H[4].copy(Z),H[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let W=this.planes,Z=J.elements,K=Z[0],H=Z[1],Y=Z[2],X=Z[3],U=Z[4],E=Z[5],q=Z[6],G=Z[7],F=Z[8],L=Z[9],z=Z[10],D=Z[11],N=Z[12],w=Z[13],y=Z[14],V=Z[15];if(W[0].setComponents(X-K,G-U,D-F,V-N).normalize(),W[1].setComponents(X+K,G+U,D+F,V+N).normalize(),W[2].setComponents(X+H,G+E,D+L,V+w).normalize(),W[3].setComponents(X-H,G-E,D-L,V-w).normalize(),$)W[4].setComponents(Y,q,z,y).normalize(),W[5].setComponents(X-Y,G-q,D-z,V-y).normalize();else if(W[4].setComponents(X-Y,G-q,D-z,V-y).normalize(),Q===2000)W[5].setComponents(X+Y,G+q,D+z,V+y).normalize();else if(Q===2001)W[5].setComponents(Y,q,z,y).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();T8.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();T8.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(T8)}intersectsSprite(J){T8.center.set(0,0,0);let Q=tZ.distanceTo(J.center);return T8.radius=0.7071067811865476+Q,T8.applyMatrix4(J.matrixWorld),this.intersectsSphere(T8)}intersectsSphere(J){let Q=this.planes,$=J.center,W=-J.radius;for(let Z=0;Z<6;Z++)if(Q[Z].distanceToPoint($)<W)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let W=Q[$];if(K6.x=W.normal.x>0?J.max.x:J.min.x,K6.y=W.normal.y>0?J.max.y:J.min.y,K6.z=W.normal.z>0?J.max.z:J.min.z,W.distanceToPoint(K6)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class C6 extends BJ{constructor(J=[],Q=301,$,W,Z,K,H,Y,X,U){super(J,Q,$,W,Z,K,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class p8 extends BJ{constructor(J,Q,$=1014,W,Z,K,H=1003,Y=1003,X,U=1026,E=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let q={width:J,height:Q,depth:E};super(q,W,Z,K,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new S9(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);return Q.compareFunction=this.compareFunction,Q}}class OQ extends p8{constructor(J,Q=1014,$=301,W,Z,K=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},E=[U,U,U,U,U,U];super(J,J,Q,$,W,Z,K,H,Y,X);this.image=E,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class _6 extends BJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class D9 extends sJ{constructor(J=1,Q=1,$=1,W=1,Z=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:W,heightSegments:Z,depthSegments:K};let H=this;W=Math.floor(W),Z=Math.floor(Z),K=Math.floor(K);let Y=[],X=[],U=[],E=[],q=0,G=0;F("z","y","x",-1,-1,$,Q,J,K,Z,0),F("z","y","x",1,-1,$,Q,-J,K,Z,1),F("x","z","y",1,1,J,$,Q,W,K,2),F("x","z","y",1,-1,J,$,-Q,W,K,3),F("x","y","z",1,-1,J,Q,$,W,Z,4),F("x","y","z",-1,-1,J,Q,-$,W,Z,5),this.setIndex(Y),this.setAttribute("position",new PJ(X,3)),this.setAttribute("normal",new PJ(U,3)),this.setAttribute("uv",new PJ(E,2));function F(L,z,D,N,w,y,V,I,A,C,M){let B=y/A,l=V/C,v=y/2,f=V/2,r=I/2,S=A+1,d=C+1,o=0,m=0,Q0=new x;for(let c=0;c<d;c++){let a=c*l-f;for(let J0=0;J0<S;J0++){let C0=J0*B-v;Q0[L]=C0*N,Q0[z]=a*w,Q0[D]=r,X.push(Q0.x,Q0.y,Q0.z),Q0[L]=0,Q0[z]=0,Q0[D]=I>0?1:-1,U.push(Q0.x,Q0.y,Q0.z),E.push(J0/A),E.push(1-c/C),o+=1}}for(let c=0;c<C;c++)for(let a=0;a<A;a++){let J0=q+a+S*c,C0=q+a+S*(c+1),z0=q+(a+1)+S*(c+1),JJ=q+(a+1)+S*c;Y.push(J0,C0,JJ),Y.push(C0,z0,JJ),m+=6}H.addGroup(G,m,M),G+=m,q+=o}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new D9(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class f9 extends sJ{constructor(J=1,Q=1,$=1,W=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:W};let Z=J/2,K=Q/2,H=Math.floor($),Y=Math.floor(W),X=H+1,U=Y+1,E=J/H,q=Q/Y,G=[],F=[],L=[],z=[];for(let D=0;D<U;D++){let N=D*q-K;for(let w=0;w<X;w++){let y=w*E-Z;F.push(y,-N,0),L.push(0,0,1),z.push(w/H),z.push(1-D/Y)}}for(let D=0;D<Y;D++)for(let N=0;N<H;N++){let w=N+X*D,y=N+X*(D+1),V=N+1+X*(D+1),I=N+1+X*D;G.push(w,y,I),G.push(y,V,I)}this.setIndex(G),this.setAttribute("position",new PJ(F,3)),this.setAttribute("normal",new PJ(L,3)),this.setAttribute("uv",new PJ(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new f9(J.width,J.height,J.widthSegments,J.heightSegments)}}class F9 extends sJ{constructor(J=1,Q=0.4,$=12,W=48,Z=Math.PI*2,K=0,H=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:Q,radialSegments:$,tubularSegments:W,arc:Z,thetaStart:K,thetaLength:H},$=Math.floor($),W=Math.floor(W);let Y=[],X=[],U=[],E=[],q=new x,G=new x,F=new x;for(let L=0;L<=$;L++){let z=K+L/$*H;for(let D=0;D<=W;D++){let N=D/W*Z;G.x=(J+Q*Math.cos(z))*Math.cos(N),G.y=(J+Q*Math.cos(z))*Math.sin(N),G.z=Q*Math.sin(z),X.push(G.x,G.y,G.z),q.x=J*Math.cos(N),q.y=J*Math.sin(N),F.subVectors(G,q).normalize(),U.push(F.x,F.y,F.z),E.push(D/W),E.push(L/$)}}for(let L=1;L<=$;L++)for(let z=1;z<=W;z++){let D=(W+1)*L+z-1,N=(W+1)*(L-1)+z-1,w=(W+1)*(L-1)+z,y=(W+1)*L+z;Y.push(D,N,y),Y.push(N,w,y)}this.setIndex(Y),this.setAttribute("position",new PJ(X,3)),this.setAttribute("normal",new PJ(U,3)),this.setAttribute("uv",new PJ(E,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new F9(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc,J.thetaStart,J.thetaLength)}}function m8(J){let Q={};for(let $ in J){Q[$]={};for(let W in J[$]){let Z=J[$][W];if(V$(Z))if(Z.isRenderTargetTexture)P0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][W]=null;else Q[$][W]=Z.clone();else if(Array.isArray(Z))if(V$(Z[0])){let K=[];for(let H=0,Y=Z.length;H<Y;H++)K[H]=Z[H].clone();Q[$][W]=K}else Q[$][W]=Z.slice();else Q[$][W]=Z}}return Q}function IJ(J){let Q={};for(let $=0;$<J.length;$++){let W=m8(J[$]);for(let Z in W)Q[Z]=W[Z]}return Q}function V$(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function eZ(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function RQ(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return x0.workingColorSpace}var TW={clone:m8,merge:IJ},JK=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,QK=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gJ extends g8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=JK,this.fragmentShader=QK,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=m8(J.uniforms),this.uniformsGroups=eZ(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let W in this.uniforms){let K=this.uniforms[W].value;if(K&&K.isTexture)Q.uniforms[W]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[W]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[W]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[W]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[W]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[W]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[W]={type:"m4",value:K.toArray()};else Q.uniforms[W]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let W in this.extensions)if(this.extensions[W]===!0)$[W]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let W=J.uniforms[$];switch(this.uniforms[$]={},W.type){case"t":this.uniforms[$].value=Q[W.value]||null;break;case"c":this.uniforms[$].value=new m0().setHex(W.value);break;case"v2":this.uniforms[$].value=new p0().fromArray(W.value);break;case"v3":this.uniforms[$].value=new x().fromArray(W.value);break;case"v4":this.uniforms[$].value=new HJ().fromArray(W.value);break;case"m3":this.uniforms[$].value=new S0().fromArray(W.value);break;case"m4":this.uniforms[$].value=new KJ().fromArray(W.value);break;default:this.uniforms[$].value=W.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class MQ extends gJ{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class P6 extends g8{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new m0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new m0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new p0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new N8,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class kQ extends g8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class LQ extends g8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function Z9(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function U7(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class l8{constructor(J,Q,$,W){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=W!==void 0?W:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,W=Q[$],Z=Q[$-1];$:{J:{let K;Q:{W:if(!(J<W)){for(let H=$+2;;){if(W===void 0){if(J<Z)break W;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(Z=W,W=Q[++$],J<W)break J}K=Q.length;break Q}if(!(J>=Z)){let H=Q[1];if(J<H)$=2,Z=H;for(let Y=$-2;;){if(Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(W=Z,Z=Q[--$-1],J>=Z)break J}K=$,$=0;break Q}break $}while($<K){let H=$+K>>>1;if(J<Q[H])K=H;else $=H+1}if(W=Q[$],Z=Q[$-1],Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,Z,W)}return this.interpolate_($,Z,J,W)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,W=this.valueSize,Z=J*W;for(let K=0;K!==W;++K)Q[K]=$[Z+K];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class VQ extends l8{constructor(J,Q,$,W){super(J,Q,$,W);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let W=this.parameterPositions,Z=J-2,K=J+1,H=W[Z],Y=W[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:Z=J,H=2*Q-$;break;case 2402:Z=W.length-2,H=Q+W[Z]-W[Z+1];break;default:Z=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*$-Q;break;case 2402:K=1,Y=$+W[1]-W[0];break;default:K=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=Z*U,this._offsetNext=K*U}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,E=this._offsetNext,q=this._weightPrev,G=this._weightNext,F=($-Q)/(W-Q),L=F*F,z=L*F,D=-q*z+2*q*L-q*F,N=(1+q)*z+(-1.5-2*q)*L+(-0.5+q)*F+1,w=(-1-G)*z+(1.5+G)*L+0.5*F,y=G*z-G*L;for(let V=0;V!==H;++V)Z[V]=D*K[U+V]+N*K[X+V]+w*K[Y+V]+y*K[E+V];return Z}}class BQ extends l8{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(W-Q),E=1-U;for(let q=0;q!==H;++q)Z[q]=K[X+q]*E+K[Y+q]*U;return Z}}class IQ extends l8{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J){return this.copySampleValue_(J-1)}}class zQ extends l8{interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,E=this.outTangents;if(!U||!E){let F=($-Q)/(W-Q),L=1-F;for(let z=0;z!==H;++z)Z[z]=K[X+z]*L+K[Y+z]*F;return Z}let q=H*2,G=J-1;for(let F=0;F!==H;++F){let L=K[X+F],z=K[Y+F],D=G*q+F*2,N=E[D],w=E[D+1],y=J*q+F*2,V=U[y],I=U[y+1],A=WK($,Q,N,V,W);Z[F]=SW(A,L,w,I,z)}return Z}}function SW(J,Q,$,W,Z){let K=1-J;return K*K*K*Q+3*K*K*J*$+3*K*J*J*W+J*J*J*Z}function $K(J,Q,$,W,Z){let K=1-J;return 3*K*K*($-Q)+6*K*J*(W-$)+3*J*J*(Z-W)}function WK(J,Q,$,W,Z){let K=(J-Q)/(Z-Q);for(let H=0;H<8;H++){let Y=SW(K,Q,$,W,Z)-J;if(Math.abs(Y)<0.0000000001)break;let X=$K(K,Q,$,W,Z);if(Math.abs(X)<0.0000000001)break;K=Math.max(0,Math.min(1,K-Y/X))}return K}class pJ{constructor(J,Q,$,W){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=Z9(Q,this.TimeBufferType),this.values=Z9($,this.ValueBufferType),this.setInterpolation(W||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:Z9(J.times,Array),values:Z9(J.values,Array)};let W=J.getInterpolation();if(W!==J.DefaultInterpolation)$.interpolation=W;if(U7(J.settings))$.settings={inTangents:Z9(J.settings.inTangents,Array),outTangents:Z9(J.settings.outTangents,Array)}}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new IQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new BQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new VQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new zQ(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return P0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,W=Q.length;$!==W;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,W=Q.length;$!==W;++$)Q[$]*=J;if(U7(this.settings))B$(this.settings.inTangents,J),B$(this.settings.outTangents,J)}return this}trim(J,Q){let $=this.times,W=$.length,Z=0,K=W-1;while(Z!==W&&$[Z]<J)++Z;while(K!==-1&&$[K]>Q)--K;if(++K,Z!==0||K!==W){if(Z>=K)K=Math.max(K,1),Z=K-1;let H=this.getValueSize();this.times=$.slice(Z,K),this.values=this.values.slice(Z*H,K*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)T0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,W=this.values,Z=$.length;if(Z===0)T0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==Z;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){T0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){T0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(W!==void 0){if(yZ(W))for(let H=0,Y=W.length;H!==Y;++H){let X=W[H];if(isNaN(X)){T0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),W=this.getInterpolation()===2302,Z=J.length-1,K=1;for(let H=1;H<Z;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!W){let E=H*$,q=E-$,G=E+$;for(let F=0;F!==$;++F){let L=Q[E+F];if(L!==Q[q+F]||L!==Q[G+F]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let E=H*$,q=K*$;for(let G=0;G!==$;++G)Q[q+G]=Q[E+G]}++K}}if(Z>0){J[K]=J[Z];for(let H=Z*$,Y=K*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),W=new this.constructor(this.name,J,Q);if(W.createInterpolant=this.createInterpolant,U7(this.settings))W.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return W}}function B$(J,Q){for(let $=0,W=J.length;$!==W;$+=2)J[$]*=Q}pJ.prototype.ValueTypeName="";pJ.prototype.TimeBufferType=Float32Array;pJ.prototype.ValueBufferType=Float32Array;pJ.prototype.DefaultInterpolation=2301;class d8 extends pJ{constructor(J,Q,$){super(J,Q,$)}}d8.prototype.ValueTypeName="bool";d8.prototype.ValueBufferType=Array;d8.prototype.DefaultInterpolation=2300;d8.prototype.InterpolantFactoryMethodLinear=void 0;d8.prototype.InterpolantFactoryMethodSmooth=void 0;class AQ extends pJ{constructor(J,Q,$,W){super(J,Q,$,W)}}AQ.prototype.ValueTypeName="color";class wQ extends pJ{constructor(J,Q,$,W){super(J,Q,$,W)}}wQ.prototype.ValueTypeName="number";class CQ extends l8{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=($-Q)/(W-Q),X=J*H;for(let U=X+H;X!==U;X+=4)D8.slerpFlat(Z,0,K,X-H,K,X,Y);return Z}}class T6 extends pJ{constructor(J,Q,$,W){super(J,Q,$,W)}InterpolantFactoryMethodLinear(J){return new CQ(this.times,this.values,this.getValueSize(),J)}}T6.prototype.ValueTypeName="quaternion";T6.prototype.InterpolantFactoryMethodSmooth=void 0;class u8 extends pJ{constructor(J,Q,$){super(J,Q,$)}}u8.prototype.ValueTypeName="string";u8.prototype.ValueBufferType=Array;u8.prototype.DefaultInterpolation=2300;u8.prototype.InterpolantFactoryMethodLinear=void 0;u8.prototype.InterpolantFactoryMethodSmooth=void 0;class _Q extends pJ{constructor(J,Q,$,W){super(J,Q,$,W)}}_Q.prototype.ValueTypeName="vector";class PQ{constructor(J,Q,$){let W=this,Z=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,Z===!1){if(W.onStart!==void 0)W.onStart(U,K,H)}Z=!0},this.itemEnd=function(U){if(K++,W.onProgress!==void 0)W.onProgress(U,K,H);if(K===H){if(Z=!1,W.onLoad!==void 0)W.onLoad()}},this.itemError=function(U){if(W.onError!==void 0)W.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,E){return X.push(U,E),this},this.removeHandler=function(U){let E=X.indexOf(U);if(E!==-1)X.splice(E,2);return this},this.getHandler=function(U){for(let E=0,q=X.length;E<q;E+=2){let G=X[E],F=X[E+1];if(G.global)G.lastIndex=0;if(G.test(U))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var jW=new PQ;class TQ{constructor(J){if(this.manager=J!==void 0?J:jW,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(W,Z){$.load(J,W,Q,Z)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}TQ.DEFAULT_MATERIAL_NAME="__DEFAULT";class S6 extends MJ{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new m0(J),this.intensity=Q}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}var G7=new KJ,I$=new x,z$=new x;class SQ{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new p0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new KJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new v9,this._frameExtents=new p0(1,1),this._viewportCount=1,this._viewports=[new HJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera;I$.setFromMatrixPosition(J.matrixWorld),Q.position.copy(I$),z$.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(z$),Q.updateMatrixWorld(),this._updateMatrix(Q,this.matrix,this._frustum)}_updateMatrix(J,Q,$,W){G7.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),$.setFromProjectionMatrix(G7,J.coordinateSystem,J.reversedDepth);let Z=this._frameExtents,K=W?W.z/Z.x:1,H=W?W.w/Z.y:1,Y=W?W.x/Z.x:0,X=W?W.y/Z.y:0;if(J.coordinateSystem===2001||J.reversedDepth)Q.set(0.5*K,0,0,0.5*K+Y,0,0.5*H,0,0.5*H+X,0,0,1,0,0,0,0,1);else Q.set(0.5*K,0,0,0.5*K+Y,0,0.5*H,0,0.5*H+X,0,0,0.5,0.5,0,0,0,1);Q.multiply(G7)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var H6=new x,Y6=new D8,aJ=new x;class j6 extends MJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new KJ,this.projectionMatrix=new KJ,this.projectionMatrixInverse=new KJ,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(H6,Y6,aJ),aJ.x===1&&aJ.y===1&&aJ.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(H6,Y6,aJ.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(H6,Y6,aJ),aJ.x===1&&aJ.y===1&&aJ.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(H6,Y6,aJ.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var B8=new x,A$=new p0,w$=new p0;class AJ extends j6{constructor(J=50,Q=1,$=0.1,W=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=W,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=X6*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(l6*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return X6*2*Math.atan(Math.tan(l6*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){B8.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(B8.x,B8.y).multiplyScalar(-J/B8.z),B8.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(B8.x,B8.y).multiplyScalar(-J/B8.z)}getViewSize(J,Q){return this.getViewBounds(J,A$,w$),Q.subVectors(w$,A$)}setViewOffset(J,Q,$,W,Z,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(l6*0.5*this.fov)/this.zoom,$=2*Q,W=this.aspect*$,Z=-0.5*W,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;Z+=K.offsetX*W/Y,Q-=K.offsetY*$/X,W*=K.width/Y,$*=K.height/X}let H=this.filmOffset;if(H!==0)Z+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(Z,Z+W,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class h9 extends j6{constructor(J=-1,Q=1,$=1,W=-1,Z=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=W,this.near=Z,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,W,Z,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,W=(this.top+this.bottom)/2,Z=$-J,K=$+J,H=W+Q,Y=W-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;Z+=X*this.view.offsetX,K=Z+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(Z,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class yW extends SQ{constructor(){super(new h9(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class y6 extends S6{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(MJ.DEFAULT_UP),this.updateMatrix(),this.target=new MJ,this.shadow=new yW}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}class v6 extends S6{constructor(J,Q){super(J,Q);this.isAmbientLight=!0,this.type="AmbientLight"}}var K9=-90,H9=1;class jQ extends MJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let W=new AJ(K9,H9,J,Q);W.layers=this.layers,this.add(W);let Z=new AJ(K9,H9,J,Q);Z.layers=this.layers,this.add(Z);let K=new AJ(K9,H9,J,Q);K.layers=this.layers,this.add(K);let H=new AJ(K9,H9,J,Q);H.layers=this.layers,this.add(H);let Y=new AJ(K9,H9,J,Q);Y.layers=this.layers,this.add(Y);let X=new AJ(K9,H9,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,W,Z,K,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),W.up.set(0,1,0),W.lookAt(-1,0,0),Z.up.set(0,0,-1),Z.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),W.up.set(0,-1,0),W.lookAt(1,0,0),Z.up.set(0,0,1),Z.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:W}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[Z,K,H,Y,X,U]=this.children,E=J.getRenderTarget(),q=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let L=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let z=!1;if(J.isWebGLRenderer===!0)z=J.state.buffers.depth.getReversed();else z=J.reversedDepthBuffer;if(J.setRenderTarget($,0,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Z),J.setRenderTarget($,1,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=L,J.setRenderTarget($,5,W),z&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(E,q,G),J.xr.enabled=F,$.texture.needsPMREMUpdate=!0}}class yQ extends AJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var vQ="\\[\\]\\.:\\/",ZK=new RegExp("["+vQ+"]","g"),fQ="[^"+vQ+"]",KK="[^"+vQ.replace("\\.","")+"]",HK=/((?:WC+[\/:])*)/.source.replace("WC",fQ),YK=/(WCOD+)?/.source.replace("WCOD",KK),XK=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fQ),UK=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fQ),GK=new RegExp("^"+HK+YK+XK+UK+"$"),NK=["material","materials","bones","map"];class vW{constructor(J,Q,$){let W=$||a0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,W)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,W=this._bindings[$];if(W!==void 0)W.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let W=this._targetGroup.nCachedObjects_,Z=$.length;W!==Z;++W)$[W].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class a0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||a0.parseTrackName(Q),this.node=a0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new a0(J,Q,$);else return new a0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(ZK,"")}static parseTrackName(J){let Q=GK.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},W=$.nodeName&&$.nodeName.lastIndexOf(".");if(W!==void 0&&W!==-1){let Z=$.nodeName.substring(W+1);if(NK.indexOf(Z)!==-1)$.nodeName=$.nodeName.substring(0,W),$.objectName=Z}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(Z){for(let K=0;K<Z.length;K++){let H=Z[K];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},W=$(J.children);if(W)return W}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)J[Q++]=$[W]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,W=Q.propertyName,Z=Q.propertyIndex;if(!J)J=a0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){P0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){T0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){T0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){T0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){T0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){T0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){T0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){T0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let K=J[W];if(K===void 0){let X=Q.nodeName;T0("PropertyBinding: Trying to update property for track: "+X+"."+W+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(Z!==void 0){if(W==="morphTargetInfluences"){if(!J.geometry){T0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){T0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[Z]!==void 0)Z=J.morphTargetDictionary[Z]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=Z}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=W;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}a0.Composite=vW;a0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};a0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};a0.prototype.GetterByBindingType=[a0.prototype._getValue_direct,a0.prototype._getValue_array,a0.prototype._getValue_arrayElement,a0.prototype._getValue_toArray];a0.prototype.SetterByBindingTypeAndVersioning=[[a0.prototype._setValue_direct,a0.prototype._setValue_direct_setNeedsUpdate,a0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[a0.prototype._setValue_array,a0.prototype._setValue_array_setNeedsUpdate,a0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[a0.prototype._setValue_arrayElement,a0.prototype._setValue_arrayElement_setNeedsUpdate,a0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[a0.prototype._setValue_fromArray,a0.prototype._setValue_fromArray_setNeedsUpdate,a0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var KG=new Float32Array(1);class hQ{static{hQ.prototype.isMatrix2=!0}constructor(J,Q,$,W){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,W)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,W){let Z=this.elements;return Z[0]=J,Z[2]=Q,Z[1]=$,Z[3]=W,this}}function bQ(J,Q,$,W){let Z=EK(W);switch($){case 1021:return J*Q;case 1028:return J*Q/Z.components*Z.byteLength;case 1029:return J*Q/Z.components*Z.byteLength;case 1030:return J*Q*2/Z.components*Z.byteLength;case 1031:return J*Q*2/Z.components*Z.byteLength;case 1022:return J*Q*3/Z.components*Z.byteLength;case 1023:return J*Q*4/Z.components*Z.byteLength;case 1033:return J*Q*4/Z.components*Z.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function EK(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)P0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function $Z(){let J=null,Q=!1,$=null,W=null;function Z(K,H){W=J.requestAnimationFrame(Z),$(K,H)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;W=J.requestAnimationFrame(Z),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(W);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function qK(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:E}=Y,q=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,E),Y.onUploadCallback();let F;if(U instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)F=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)F=J.SHORT;else if(U instanceof Uint32Array)F=J.UNSIGNED_INT;else if(U instanceof Int32Array)F=J.INT;else if(U instanceof Int8Array)F=J.BYTE;else if(U instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:F,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:q}}function W(Y,X,U){let{array:E,updateRanges:q}=X;if(J.bindBuffer(U,Y),q.length===0)J.bufferSubData(U,0,E);else{q.sort((F,L)=>F.start-L.start);let G=0;for(let F=1;F<q.length;F++){let L=q[G],z=q[F];if(z.start<=L.start+L.count+1)L.count=Math.max(L.count,z.start+z.count-L.start);else++G,q[G]=z}q.length=G+1;for(let F=0,L=q.length;F<L;F++){let z=q[F];J.bufferSubData(U,z.start*E.BYTES_PER_ELEMENT,E,z.start,z.count)}X.clearUpdateRanges()}X.onUploadCallback()}function Z(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let E=Q.get(Y);if(!E||E.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(U.buffer,Y,X),U.version=Y.version}}return{get:Z,remove:K,update:H}}var DK=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,FK=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,OK=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,RK=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,MK=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kK=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,LK=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,VK=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,BK=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,IK=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zK=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,AK=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wK=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,CK=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_K=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,PK=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,TK=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,SK=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jK=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yK=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,vK=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,fK=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hK=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,bK=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xK=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gK=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,pK=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mK=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lK=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dK=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uK="gl_FragColor = linearToOutputTexel( gl_FragColor );",cK=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nK=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,sK=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,iK=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,oK=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,aK=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rK=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tK=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eK=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,JH=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,QH=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$H=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,WH=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ZH=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,KH=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,HH=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,YH=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,XH=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,UH=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,GH=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NH=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,EH=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qH=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,DH=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,FH=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,OH=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,RH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,MH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,VH=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,BH=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,IH=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zH=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,AH=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wH=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,CH=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_H=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,PH=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TH=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,SH=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jH=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yH=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vH=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fH=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hH=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,bH=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xH=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gH=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pH=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mH=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lH=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dH=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,uH=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cH=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nH=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sH=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,iH=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,oH=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,aH=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,rH=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tH=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eH=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,JY=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,QY=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$Y=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WY=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ZY=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,KY=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,HY=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,YY=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,XY=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,UY=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,GY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,NY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,EY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qY=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,DY=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,FY=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,RY=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kY=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LY=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,VY=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,BY=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,IY=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,zY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,AY=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wY=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CY=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_Y=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,PY=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TY=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SY=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jY=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yY=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vY=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fY=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hY=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bY=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xY=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gY=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pY=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mY=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lY=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dY=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uY=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cY=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nY=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sY=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,v0={alphahash_fragment:DK,alphahash_pars_fragment:FK,alphamap_fragment:OK,alphamap_pars_fragment:RK,alphatest_fragment:MK,alphatest_pars_fragment:kK,aomap_fragment:LK,aomap_pars_fragment:VK,batching_pars_vertex:BK,batching_vertex:IK,begin_vertex:zK,beginnormal_vertex:AK,bsdfs:wK,iridescence_fragment:CK,bumpmap_pars_fragment:_K,clipping_planes_fragment:PK,clipping_planes_pars_fragment:TK,clipping_planes_pars_vertex:SK,clipping_planes_vertex:jK,color_fragment:yK,color_pars_fragment:vK,color_pars_vertex:fK,color_vertex:hK,common:bK,cube_uv_reflection_fragment:xK,defaultnormal_vertex:gK,displacementmap_pars_vertex:pK,displacementmap_vertex:mK,emissivemap_fragment:lK,emissivemap_pars_fragment:dK,colorspace_fragment:uK,colorspace_pars_fragment:cK,envmap_fragment:nK,envmap_common_pars_fragment:sK,envmap_pars_fragment:iK,envmap_pars_vertex:oK,envmap_physical_pars_fragment:HH,envmap_vertex:aK,fog_vertex:rK,fog_pars_vertex:tK,fog_fragment:eK,fog_pars_fragment:JH,gradientmap_pars_fragment:QH,lightmap_pars_fragment:$H,lights_lambert_fragment:WH,lights_lambert_pars_fragment:ZH,lights_pars_begin:KH,lights_toon_fragment:YH,lights_toon_pars_fragment:XH,lights_phong_fragment:UH,lights_phong_pars_fragment:GH,lights_physical_fragment:NH,lights_physical_pars_fragment:EH,lights_fragment_begin:qH,lights_fragment_maps:DH,lights_fragment_end:FH,lightprobes_pars_fragment:OH,logdepthbuf_fragment:RH,logdepthbuf_pars_fragment:MH,logdepthbuf_pars_vertex:kH,logdepthbuf_vertex:LH,map_fragment:VH,map_pars_fragment:BH,map_particle_fragment:IH,map_particle_pars_fragment:zH,metalnessmap_fragment:AH,metalnessmap_pars_fragment:wH,morphinstance_vertex:CH,morphcolor_vertex:_H,morphnormal_vertex:PH,morphtarget_pars_vertex:TH,morphtarget_vertex:SH,normal_fragment_begin:jH,normal_fragment_maps:yH,normal_pars_fragment:vH,normal_pars_vertex:fH,normal_vertex:hH,normalmap_pars_fragment:bH,clearcoat_normal_fragment_begin:xH,clearcoat_normal_fragment_maps:gH,clearcoat_pars_fragment:pH,iridescence_pars_fragment:mH,opaque_fragment:lH,packing:dH,premultiplied_alpha_fragment:uH,project_vertex:cH,dithering_fragment:nH,dithering_pars_fragment:sH,roughnessmap_fragment:iH,roughnessmap_pars_fragment:oH,shadowmap_pars_fragment:aH,shadowmap_pars_vertex:rH,shadowmap_vertex:tH,shadowmask_pars_fragment:eH,skinbase_vertex:JY,skinning_pars_vertex:QY,skinning_vertex:$Y,skinnormal_vertex:WY,specularmap_fragment:ZY,specularmap_pars_fragment:KY,tonemapping_fragment:HY,tonemapping_pars_fragment:YY,transmission_fragment:XY,transmission_pars_fragment:UY,uv_pars_fragment:GY,uv_pars_vertex:NY,uv_vertex:EY,worldpos_vertex:qY,background_vert:DY,background_frag:FY,backgroundCube_vert:OY,backgroundCube_frag:RY,cube_vert:MY,cube_frag:kY,depth_vert:LY,depth_frag:VY,distance_vert:BY,distance_frag:IY,equirect_vert:zY,equirect_frag:AY,linedashed_vert:wY,linedashed_frag:CY,meshbasic_vert:_Y,meshbasic_frag:PY,meshlambert_vert:TY,meshlambert_frag:SY,meshmatcap_vert:jY,meshmatcap_frag:yY,meshnormal_vert:vY,meshnormal_frag:fY,meshphong_vert:hY,meshphong_frag:bY,meshphysical_vert:xY,meshphysical_frag:gY,meshtoon_vert:pY,meshtoon_frag:mY,points_vert:lY,points_frag:dY,shadow_vert:uY,shadow_frag:cY,sprite_vert:nY,sprite_frag:sY},G0={common:{diffuse:{value:new m0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new S0},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new S0}},envmap:{envMap:{value:null},envMapRotation:{value:new S0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new S0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new S0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new S0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new S0},normalScale:{value:new p0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new S0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new S0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new S0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new S0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new m0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new x},probesMax:{value:new x},probesResolution:{value:new x}},points:{diffuse:{value:new m0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0},uvTransform:{value:new S0}},sprite:{diffuse:{value:new m0(16777215)},opacity:{value:1},center:{value:new p0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new S0},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0}}},W8={basic:{uniforms:IJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.fog]),vertexShader:v0.meshbasic_vert,fragmentShader:v0.meshbasic_frag},lambert:{uniforms:IJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,G0.lights,{emissive:{value:new m0(0)},envMapIntensity:{value:1}}]),vertexShader:v0.meshlambert_vert,fragmentShader:v0.meshlambert_frag},phong:{uniforms:IJ([G0.common,G0.specularmap,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,G0.lights,{emissive:{value:new m0(0)},specular:{value:new m0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:v0.meshphong_vert,fragmentShader:v0.meshphong_frag},standard:{uniforms:IJ([G0.common,G0.envmap,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.roughnessmap,G0.metalnessmap,G0.fog,G0.lights,{emissive:{value:new m0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:v0.meshphysical_vert,fragmentShader:v0.meshphysical_frag},toon:{uniforms:IJ([G0.common,G0.aomap,G0.lightmap,G0.emissivemap,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.gradientmap,G0.fog,G0.lights,{emissive:{value:new m0(0)}}]),vertexShader:v0.meshtoon_vert,fragmentShader:v0.meshtoon_frag},matcap:{uniforms:IJ([G0.common,G0.bumpmap,G0.normalmap,G0.displacementmap,G0.fog,{matcap:{value:null}}]),vertexShader:v0.meshmatcap_vert,fragmentShader:v0.meshmatcap_frag},points:{uniforms:IJ([G0.points,G0.fog]),vertexShader:v0.points_vert,fragmentShader:v0.points_frag},dashed:{uniforms:IJ([G0.common,G0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:v0.linedashed_vert,fragmentShader:v0.linedashed_frag},depth:{uniforms:IJ([G0.common,G0.displacementmap]),vertexShader:v0.depth_vert,fragmentShader:v0.depth_frag},normal:{uniforms:IJ([G0.common,G0.bumpmap,G0.normalmap,G0.displacementmap,{opacity:{value:1}}]),vertexShader:v0.meshnormal_vert,fragmentShader:v0.meshnormal_frag},sprite:{uniforms:IJ([G0.sprite,G0.fog]),vertexShader:v0.sprite_vert,fragmentShader:v0.sprite_frag},background:{uniforms:{uvTransform:{value:new S0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:v0.background_vert,fragmentShader:v0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new S0}},vertexShader:v0.backgroundCube_vert,fragmentShader:v0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:v0.cube_vert,fragmentShader:v0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:v0.equirect_vert,fragmentShader:v0.equirect_frag},distance:{uniforms:IJ([G0.common,G0.displacementmap,{referencePosition:{value:new x},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:v0.distance_vert,fragmentShader:v0.distance_frag},shadow:{uniforms:IJ([G0.lights,G0.fog,{color:{value:new m0(0)},opacity:{value:1}}]),vertexShader:v0.shadow_vert,fragmentShader:v0.shadow_frag}};W8.physical={uniforms:IJ([W8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new S0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new S0},clearcoatNormalScale:{value:new p0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new S0},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new S0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new S0},sheen:{value:0},sheenColor:{value:new m0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new S0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new S0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new S0},transmissionSamplerSize:{value:new p0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new S0},attenuationDistance:{value:0},attenuationColor:{value:new m0(0)},specularColor:{value:new m0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new S0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new S0},anisotropyVector:{value:new p0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new S0}}]),vertexShader:v0.meshphysical_vert,fragmentShader:v0.meshphysical_frag};var f6={r:0,b:0,g:0},iY=new KJ,WZ=new S0;WZ.set(-1,0,0,0,1,0,0,0,1);function oY(J,Q,$,W,Z,K){let H=new m0(0),Y=Z===!0?0:1,X,U,E=null,q=0,G=null;function F(w){let y=w.isScene===!0?w.background:null;if(y&&y.isTexture){let V=w.backgroundBlurriness>0;y=Q.get(y,V)}return y}function L(w){let y=!1,V=F(w);if(V===null)D(H,Y);else if(V&&V.isColor)D(V,1),y=!0;let I=J.xr.getEnvironmentBlendMode();if(I==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(I==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||y)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function z(w,y){let V=F(y);if(V&&(V.isCubeTexture||V.mapping===C9)){if(U===void 0)U=new jJ(new D9(1,1,1),new gJ({name:"BackgroundCubeMaterial",uniforms:m8(W8.backgroundCube.uniforms),vertexShader:W8.backgroundCube.vertexShader,fragmentShader:W8.backgroundCube.fragmentShader,side:TJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(I,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),W.update(U);if(U.material.uniforms.envMap.value=V,U.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(iY.makeRotationFromEuler(y.backgroundRotation)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(WZ);if(U.material.toneMapped=x0.getTransfer(V.colorSpace)!==e0,E!==V||q!==V.version||G!==J.toneMapping)U.material.needsUpdate=!0,E=V,q=V.version,G=J.toneMapping;U.layers.enableAll(),w.unshift(U,U.geometry,U.material,0,0,null)}else if(V&&V.isTexture){if(X===void 0)X=new jJ(new f9(2,2),new gJ({name:"BackgroundMaterial",uniforms:m8(W8.background.uniforms),vertexShader:W8.background.vertexShader,fragmentShader:W8.background.fragmentShader,side:G9,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),W.update(X);if(X.material.uniforms.t2D.value=V,X.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,X.material.toneMapped=x0.getTransfer(V.colorSpace)!==e0,V.matrixAutoUpdate===!0)V.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(V.matrix),E!==V||q!==V.version||G!==J.toneMapping)X.material.needsUpdate=!0,E=V,q=V.version,G=J.toneMapping;X.layers.enableAll(),w.unshift(X,X.geometry,X.material,0,0,null)}}function D(w,y){w.getRGB(f6,RQ(J)),$.buffers.color.setClear(f6.r,f6.g,f6.b,y,K)}function N(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(w,y=1){H.set(w),Y=y,D(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(w){Y=w,D(H,Y)},render:L,addToRenderList:z,dispose:N}}function aY(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),W={},Z=G(null),K=Z,H=!1;function Y(v,f,r,S,d){let o=!1,m=q(v,S,r,f);if(K!==m)K=m,U(K.object);if(o=F(v,S,r,d),o)L(v,S,r,d);if(d!==null)Q.update(d,J.ELEMENT_ARRAY_BUFFER);if(o||H){if(H=!1,V(v,f,r,S),d!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(d).buffer)}}function X(){return J.createVertexArray()}function U(v){return J.bindVertexArray(v)}function E(v){return J.deleteVertexArray(v)}function q(v,f,r,S){let d=S.wireframe===!0,o=W[f.id];if(o===void 0)o={},W[f.id]=o;let m=v.isInstancedMesh===!0?v.id:0,Q0=o[m];if(Q0===void 0)Q0={},o[m]=Q0;let c=Q0[r.id];if(c===void 0)c={},Q0[r.id]=c;let a=c[d];if(a===void 0)a=G(X()),c[d]=a;return a}function G(v){let f=[],r=[],S=[];for(let d=0;d<$;d++)f[d]=0,r[d]=0,S[d]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:f,enabledAttributes:r,attributeDivisors:S,object:v,attributes:{},index:null}}function F(v,f,r,S){let d=K.attributes,o=f.attributes,m=0,Q0=r.getAttributes();for(let c in Q0)if(Q0[c].location>=0){let J0=d[c],C0=o[c];if(C0===void 0){if(c==="instanceMatrix"&&v.instanceMatrix)C0=v.instanceMatrix;if(c==="instanceColor"&&v.instanceColor)C0=v.instanceColor}if(J0===void 0)return!0;if(J0.attribute!==C0)return!0;if(C0&&J0.data!==C0.data)return!0;m++}if(K.attributesNum!==m)return!0;if(K.index!==S)return!0;return!1}function L(v,f,r,S){let d={},o=f.attributes,m=0,Q0=r.getAttributes();for(let c in Q0)if(Q0[c].location>=0){let J0=o[c];if(J0===void 0){if(c==="instanceMatrix"&&v.instanceMatrix)J0=v.instanceMatrix;if(c==="instanceColor"&&v.instanceColor)J0=v.instanceColor}let C0={};if(C0.attribute=J0,J0&&J0.data)C0.data=J0.data;d[c]=C0,m++}K.attributes=d,K.attributesNum=m,K.index=S}function z(){let v=K.newAttributes;for(let f=0,r=v.length;f<r;f++)v[f]=0}function D(v){N(v,0)}function N(v,f){let{newAttributes:r,enabledAttributes:S,attributeDivisors:d}=K;if(r[v]=1,S[v]===0)J.enableVertexAttribArray(v),S[v]=1;if(d[v]!==f)J.vertexAttribDivisor(v,f),d[v]=f}function w(){let{newAttributes:v,enabledAttributes:f}=K;for(let r=0,S=f.length;r<S;r++)if(f[r]!==v[r])J.disableVertexAttribArray(r),f[r]=0}function y(v,f,r,S,d,o,m){if(m===!0)J.vertexAttribIPointer(v,f,r,d,o);else J.vertexAttribPointer(v,f,r,S,d,o)}function V(v,f,r,S){z();let d=S.attributes,o=r.getAttributes(),m=f.defaultAttributeValues;for(let Q0 in o){let c=o[Q0];if(c.location>=0){let a=d[Q0];if(a===void 0){if(Q0==="instanceMatrix"&&v.instanceMatrix)a=v.instanceMatrix;if(Q0==="instanceColor"&&v.instanceColor)a=v.instanceColor}if(a!==void 0){let{normalized:J0,itemSize:C0}=a,z0=Q.get(a);if(z0===void 0)continue;let{buffer:JJ,type:f0,bytesPerElement:n}=z0,$0=f0===J.INT||f0===J.UNSIGNED_INT||a.gpuType===I7;if(a.isInterleavedBufferAttribute){let Z0=a.data,A0=Z0.stride,_0=a.offset;if(Z0.isInstancedInterleavedBuffer){for(let B0=0;B0<c.locationSize;B0++)N(c.location+B0,Z0.meshPerAttribute);if(v.isInstancedMesh!==!0&&S._maxInstanceCount===void 0)S._maxInstanceCount=Z0.meshPerAttribute*Z0.count}else for(let B0=0;B0<c.locationSize;B0++)D(c.location+B0);J.bindBuffer(J.ARRAY_BUFFER,JJ);for(let B0=0;B0<c.locationSize;B0++)y(c.location+B0,C0/c.locationSize,f0,J0,A0*n,(_0+C0/c.locationSize*B0)*n,$0)}else{if(a.isInstancedBufferAttribute){for(let Z0=0;Z0<c.locationSize;Z0++)N(c.location+Z0,a.meshPerAttribute);if(v.isInstancedMesh!==!0&&S._maxInstanceCount===void 0)S._maxInstanceCount=a.meshPerAttribute*a.count}else for(let Z0=0;Z0<c.locationSize;Z0++)D(c.location+Z0);J.bindBuffer(J.ARRAY_BUFFER,JJ);for(let Z0=0;Z0<c.locationSize;Z0++)y(c.location+Z0,C0/c.locationSize,f0,J0,C0*n,C0/c.locationSize*Z0*n,$0)}}else if(m!==void 0){let J0=m[Q0];if(J0!==void 0)switch(J0.length){case 2:J.vertexAttrib2fv(c.location,J0);break;case 3:J.vertexAttrib3fv(c.location,J0);break;case 4:J.vertexAttrib4fv(c.location,J0);break;default:J.vertexAttrib1fv(c.location,J0)}}}}w()}function I(){B();for(let v in W){let f=W[v];for(let r in f){let S=f[r];for(let d in S){let o=S[d];for(let m in o)E(o[m].object),delete o[m];delete S[d]}}delete W[v]}}function A(v){if(W[v.id]===void 0)return;let f=W[v.id];for(let r in f){let S=f[r];for(let d in S){let o=S[d];for(let m in o)E(o[m].object),delete o[m];delete S[d]}}delete W[v.id]}function C(v){for(let f in W){let r=W[f];for(let S in r){let d=r[S];if(d[v.id]===void 0)continue;let o=d[v.id];for(let m in o)E(o[m].object),delete o[m];delete d[v.id]}}}function M(v){for(let f in W){let r=W[f],S=v.isInstancedMesh===!0?v.id:0,d=r[S];if(d===void 0)continue;for(let o in d){let m=d[o];for(let Q0 in m)E(m[Q0].object),delete m[Q0];delete d[o]}if(delete r[S],Object.keys(r).length===0)delete W[f]}}function B(){if(l(),H=!0,K===Z)return;K=Z,U(K.object)}function l(){Z.geometry=null,Z.program=null,Z.wireframe=!1}return{setup:Y,reset:B,resetDefaultState:l,dispose:I,releaseStatesOfGeometry:A,releaseStatesOfObject:M,releaseStatesOfProgram:C,initAttributes:z,enableAttribute:D,disableUnusedAttributes:w}}function rY(J,Q,$){let W;function Z(X){W=X}function K(X,U){J.drawArrays(W,X,U),$.update(U,W,1)}function H(X,U,E){if(E===0)return;J.drawArraysInstanced(W,X,U,E),$.update(U,W,E)}function Y(X,U,E){if(E===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(W,X,0,U,0,E);let G=0;for(let F=0;F<E;F++)G+=U[F];$.update(G,W,1)}this.setMode=Z,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function tY(J,Q,$,W){let Z;function K(){if(Z!==void 0)return Z;if(Q.has("EXT_texture_filter_anisotropic")===!0){let C=Q.get("EXT_texture_filter_anisotropic");Z=J.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Z=0;return Z}function H(C){if(C!==Q8&&W.convert(C)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(C){let M=C===J8&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(C!==nJ&&C!==E8&&!M&&W.convert(C)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function X(C){if(C==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";C="mediump"}if(C==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",E=X(U);if(E!==U)P0("WebGLRenderer:",U,"not supported, using",E,"instead."),U=E;let q=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)P0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),L=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),z=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),N=J.getParameter(J.MAX_VERTEX_ATTRIBS),w=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),y=J.getParameter(J.MAX_VARYING_VECTORS),V=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),I=J.getParameter(J.MAX_SAMPLES),A=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:q,reversedDepthBuffer:G,maxTextures:F,maxVertexTextures:L,maxTextureSize:z,maxCubemapSize:D,maxAttributes:N,maxVertexUniforms:w,maxVaryings:y,maxFragmentUniforms:V,maxSamples:I,samples:A}}function eY(J){let Q=this,$=null,W=0,Z=!1,K=!1,H=new rJ,Y=new S0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(q,G){let F=q.length!==0||G||W!==0||Z;return Z=G,W=q.length,F},this.beginShadows=function(){K=!0,E(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(q,G){$=E(q,G,0)},this.setState=function(q,G,F){let{clippingPlanes:L,clipIntersection:z,clipShadows:D}=q,N=J.get(q);if(!Z||L===null||L.length===0||K&&!D)if(K)E(null);else U();else{let w=K?0:W,y=w*4,V=N.clippingState||null;X.value=V,V=E(L,G,y,F);for(let I=0;I!==y;++I)V[I]=$[I];N.clippingState=V,this.numIntersection=z?this.numPlanes:0,this.numPlanes+=w}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=W>0;Q.numPlanes=W,Q.numIntersection=0}function E(q,G,F,L){let z=q!==null?q.length:0,D=null;if(z!==0){if(D=X.value,L!==!0||D===null){let N=F+z*4,w=G.matrixWorldInverse;if(Y.getNormalMatrix(w),D===null||D.length<N)D=new Float32Array(N);for(let y=0,V=F;y!==z;++y,V+=4)H.copy(q[y]).applyMatrix4(w,Y),H.normal.toArray(D,V),D[V+3]=H.constant}X.value=D,X.needsUpdate=!0}return Q.numPlanes=z,Q.numIntersection=0,D}}var R9=4,JX=6,QX=20,$X=256,b9=new h9,fW=new m0,xQ=null,gQ=0,pQ=0,mQ=!1,WX=new x,c8=new x;class uQ{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,W=100,Z={}){let{size:K=256,position:H=WX}=Z;xQ=this._renderer.getRenderTarget(),gQ=this._renderer.getActiveCubeFace(),pQ=this._renderer.getActiveMipmapLevel(),mQ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,W,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=xW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=bW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(xQ,gQ,pQ),this._renderer.xr.enabled=mQ,J.scissorTest=!1,O9(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===E9||J.mapping===j8)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);xQ=this._renderer.getRenderTarget(),gQ=this._renderer.getActiveCubeFace(),pQ=this._renderer.getActiveMipmapLevel(),mQ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:SJ,minFilter:SJ,generateMipmaps:!1,type:J8,format:Q8,colorSpace:HQ,depthBuffer:!1},W=hW(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=hW(J,Q,$);let{_lodMax:Z}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ZX(Z)),this._blurMaterial=HX(Z,J,Q),this._ggxMaterial=KX(Z,J,Q)}return W}_compileMaterial(J){let Q=new jJ(new sJ,J);this._renderer.compile(Q,b9)}_sceneToCubeUV(J,Q,$,W,Z){let Y=new AJ(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],E=this._renderer,q=E.autoClear,G=E.toneMapping;if(E.getClearColor(fW),E.toneMapping=cJ,E.autoClear=!1,E.state.buffers.depth.getReversed())E.setRenderTarget(W),E.clearDepth(),E.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new jJ(new D9,new w6({name:"PMREM.Background",side:TJ,depthWrite:!1,depthTest:!1}));let L=this._backgroundBox,z=L.material,D=!1,N=J.background;if(N){if(N.isColor)z.color.copy(N),J.background=null,D=!0}else z.color.copy(fW),D=!0;for(let w=0;w<6;w++){let y=w%3;if(y===0)Y.up.set(0,X[w],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x+U[w],Z.y,Z.z);else if(y===1)Y.up.set(0,0,X[w]),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y+U[w],Z.z);else Y.up.set(0,X[w],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y,Z.z+U[w]);let V=this._cubeSize;if(O9(W,y*V,w>2?V:0,V,V),E.setRenderTarget(W),D)E.render(L,Y);E.render(J,Y)}E.toneMapping=G,E.autoClear=q,J.background=N}_textureToCubeUV(J,Q){let $=this._renderer,W=J.mapping===E9||J.mapping===j8;if(W){if(this._cubemapMaterial===null)this._cubemapMaterial=xW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=bW();let Z=W?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=Z;let H=Z.uniforms;H.envMap.value=J;let Y=this._cubeSize;O9(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(K,b9)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let W=this._lodMeshes.length;for(let Z=1;Z<W;Z++)this._applyGGXFilter(J,Z-1,Z);Q.autoClear=$}_applyGGXFilter(J,Q,$){let W=this._renderer,Z=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[$];H.material=K;let Y=K.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),E=Math.sqrt(X*X-U*U),q=X*1.25,G=E*q,{_lodMax:F}=this,L=this._sizeLods[$],z=3*L*($>F-R9?$-F+R9:0),D=4*(this._cubeSize-L);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=F-Q,O9(Z,z,D,3*L,2*L),W.setRenderTarget(Z),W.render(H,b9),Y.envMap.value=Z.texture,Y.roughness.value=0,Y.mipInt.value=F-$,O9(J,z,D,3*L,2*L),W.setRenderTarget(J),W.render(H,b9)}_blur(J,Q,$,W){let Z=this._pingPongRenderTarget,K=Math.min(W,Math.PI)/Math.SQRT2;this._blurPass(J,Z,Q,$,K),this._blurPass(Z,J,$,$,K)}_blurPass(J,Q,$,W,Z){let K=this._renderer,H=this._blurMaterial,Y=this._lodMeshes[W];Y.material=H;let X=H.uniforms;X.envMap.value=J.texture,X.sigma.value=Z,X.mipInt.value=this._lodMax-$;let U=this._sizeLods[W],E=3*U*(W>this._lodMax-R9?W-this._lodMax+R9:0),q=4*(this._cubeSize-U);O9(Q,E,q,3*U,2*U),K.setRenderTarget(Q),K.render(Y,b9)}}function ZX(J){let Q=[],$=[],W=J,Z=J-R9+1+JX;for(let K=0;K<Z;K++){let H=Math.pow(2,W);Q.push(H);let Y=1/(H-2),X=-Y,U=1+Y,E=[X,X,U,X,U,U,X,X,U,U,X,U],q=6,G=6,F=3,L=new Float32Array(F*G*q),z=new Float32Array(F*G*q);for(let N=0;N<q;N++){let w=N%3*2/3-1,y=N>2?0:-1,V=[w,y,0,w+0.6666666666666666,y,0,w+0.6666666666666666,y+1,0,w,y,0,w+0.6666666666666666,y+1,0,w,y+1,0];L.set(V,F*G*N);for(let I=0;I<G;I++){let A=E[I*2]*2-1,C=E[I*2+1]*2-1;if(N===0)c8.set(1,C,A);else if(N===1)c8.set(-A,1,-C);else if(N===2)c8.set(-A,C,1);else if(N===3)c8.set(-1,C,-A);else if(N===4)c8.set(-A,-1,C);else c8.set(A,C,-1);c8.toArray(z,(N*G+I)*F)}}let D=new sJ;if(D.setAttribute("position",new uJ(L,F)),D.setAttribute("outputDirection",new uJ(z,F)),$.push(new jJ(D,null)),W>R9)W--}return{lodMeshes:$,sizeLods:Q}}function hW(J,Q,$){let W=new fJ(J,Q,$);return W.texture.mapping=C9,W.texture.name="PMREM.cubeUv",W.scissorTest=!0,W}function O9(J,Q,$,W,Z){J.viewport.set(Q,$,W,Z),J.scissor.set(Q,$,W,Z)}function KX(J,Q,$){return new gJ({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$X,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:b6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:eJ,depthTest:!1,depthWrite:!1})}function HX(J,Q,$){return new gJ({name:"SphericalGaussianBlur",defines:{SAMPLES:QX,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:b6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:eJ,depthTest:!1,depthWrite:!1})}function bW(){return new gJ({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:b6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:eJ,depthTest:!1,depthWrite:!1})}function xW(){return new gJ({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:b6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:eJ,depthTest:!1,depthWrite:!1})}function b6(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class sQ extends fJ{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},W=[$,$,$,$,$,$];this.texture=new C6(W),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},W=new D9(5,5,5),Z=new gJ({name:"CubemapFromEquirect",uniforms:m8($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:TJ,blending:eJ});Z.uniforms.tEquirect.value=Q;let K=new jJ(W,Z),H=Q.minFilter;if(Q.minFilter===y8)Q.minFilter=SJ;return new jQ(1,10,this).update(J,K),Q.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,W=!0){let Z=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,W);J.setRenderTarget(Z)}}function YX(J){let Q=new WeakMap,$=new WeakMap,W=null;function Z(G,F=!1){if(G===null||G===void 0)return null;if(F)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let F=G.mapping;if(F===U6||F===G6)if(Q.has(G)){let L=Q.get(G).texture;return Y(L,G.mapping)}else{let L=G.image;if(L&&L.height>0){let z=new sQ(L.height);return z.fromEquirectangularTexture(J,G),Q.set(G,z),G.addEventListener("dispose",U),Y(z.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let F=G.mapping,L=F===U6||F===G6,z=F===E9||F===j8;if(L||z){let D=$.get(G),N=D!==void 0?D.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==N){if(W===null)W=new uQ(J);return D=L?W.fromEquirectangular(G,D):W.fromCubemap(G,D),D.texture.pmremVersion=G.pmremVersion,$.set(G,D),D.texture}else if(D!==void 0)return D.texture;else{let w=G.image;if(L&&w&&w.height>0||z&&w&&X(w)){if(W===null)W=new uQ(J);return D=L?W.fromEquirectangular(G):W.fromCubemap(G),D.texture.pmremVersion=G.pmremVersion,$.set(G,D),G.addEventListener("dispose",E),D.texture}else return null}}}return G}function Y(G,F){if(F===U6)G.mapping=E9;else if(F===G6)G.mapping=j8;return G}function X(G){let F=0,L=6;for(let z=0;z<L;z++)if(G[z]!==void 0)F++;return F===L}function U(G){let F=G.target;F.removeEventListener("dispose",U);let L=Q.get(F);if(L!==void 0)Q.delete(F),L.dispose()}function E(G){let F=G.target;F.removeEventListener("dispose",E);let L=$.get(F);if(L!==void 0)$.delete(F),L.dispose()}function q(){if(Q=new WeakMap,$=new WeakMap,W!==null)W.dispose(),W=null}return{get:Z,dispose:q}}function XX(J){let Q={};function $(W){if(Q[W]!==void 0)return Q[W];let Z=J.getExtension(W);return Q[W]=Z,Z}return{has:function(W){return $(W)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(W){let Z=$(W);if(Z===null)S8("WebGLRenderer: "+W+" extension not supported.");return Z}}}function UX(J,Q,$,W){let Z={},K=new WeakMap;function H(q){let G=q.target;if(G.index!==null)Q.remove(G.index);for(let L in G.attributes)Q.remove(G.attributes[L]);G.removeEventListener("dispose",H),delete Z[G.id];let F=K.get(G);if(F)Q.remove(F),K.delete(G);if(W.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(q,G){if(Z[G.id]===!0)return G;return G.addEventListener("dispose",H),Z[G.id]=!0,$.memory.geometries++,G}function X(q){let G=q.attributes;for(let F in G)Q.update(G[F],J.ARRAY_BUFFER)}function U(q){let G=[],F=q.index,L=q.attributes.position,z=0;if(L===void 0)return;if(F!==null){let w=F.array;z=F.version;for(let y=0,V=w.length;y<V;y+=3){let I=w[y+0],A=w[y+1],C=w[y+2];G.push(I,A,A,C,C,I)}}else{let w=L.array;z=L.version;for(let y=0,V=w.length/3-1;y<V;y+=3){let I=y+0,A=y+1,C=y+2;G.push(I,A,A,C,C,I)}}let D=new(L.count>=65535?A6:z6)(G,1);D.version=z;let N=K.get(q);if(N)Q.remove(N);K.set(q,D)}function E(q){let G=K.get(q);if(G){let F=q.index;if(F!==null){if(G.version<F.version)U(q)}}else U(q);return K.get(q)}return{get:Y,update:X,getWireframeAttribute:E}}function GX(J,Q,$){let W;function Z(q){W=q}let K,H;function Y(q){K=q.type,H=q.bytesPerElement}function X(q,G){J.drawElements(W,G,K,q*H),$.update(G,W,1)}function U(q,G,F){if(F===0)return;J.drawElementsInstanced(W,G,K,q*H,F),$.update(G,W,F)}function E(q,G,F){if(F===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(W,G,0,K,q,0,F);let z=0;for(let D=0;D<F;D++)z+=G[D];$.update(z,W,1)}this.setMode=Z,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=E}function NX(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function W(K,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(K/3);break;case J.LINES:$.lines+=Y*(K/2);break;case J.LINE_STRIP:$.lines+=Y*(K-1);break;case J.LINE_LOOP:$.lines+=Y*K;break;case J.POINTS:$.points+=Y*K;break;default:T0("WebGLInfo: Unknown draw mode:",H);break}}function Z(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:Z,update:W}}function EX(J,Q,$){let W=new WeakMap,Z=new HJ;function K(H,Y,X){let U=H.morphTargetInfluences,E=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,q=E!==void 0?E.length:0,G=W.get(Y);if(G===void 0||G.count!==q){let B=function(){C.dispose(),W.delete(Y),Y.removeEventListener("dispose",B)};if(G!==void 0)G.texture.dispose();let F=Y.morphAttributes.position!==void 0,L=Y.morphAttributes.normal!==void 0,z=Y.morphAttributes.color!==void 0,D=Y.morphAttributes.position||[],N=Y.morphAttributes.normal||[],w=Y.morphAttributes.color||[],y=0;if(F===!0)y=1;if(L===!0)y=2;if(z===!0)y=3;let V=Y.attributes.position.count*y,I=1;if(V>Q.maxTextureSize)I=Math.ceil(V/Q.maxTextureSize),V=Q.maxTextureSize;let A=new Float32Array(V*I*4*q),C=new V6(A,V,I,q);C.type=E8,C.needsUpdate=!0;let M=y*4;for(let l=0;l<q;l++){let v=D[l],f=N[l],r=w[l],S=V*I*4*l;for(let d=0;d<v.count;d++){let o=d*M;if(F===!0)Z.fromBufferAttribute(v,d),A[S+o+0]=Z.x,A[S+o+1]=Z.y,A[S+o+2]=Z.z,A[S+o+3]=0;if(L===!0)Z.fromBufferAttribute(f,d),A[S+o+4]=Z.x,A[S+o+5]=Z.y,A[S+o+6]=Z.z,A[S+o+7]=0;if(z===!0)Z.fromBufferAttribute(r,d),A[S+o+8]=Z.x,A[S+o+9]=Z.y,A[S+o+10]=Z.z,A[S+o+11]=r.itemSize===4?Z.w:1}}G={count:q,texture:C,size:new p0(V,I)},W.set(Y,G),Y.addEventListener("dispose",B)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let F=0;for(let z=0;z<U.length;z++)F+=U[z];let L=Y.morphTargetsRelative?1:1-F;X.getUniforms().setValue(J,"morphTargetBaseInfluence",L),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function qX(J,Q,$,W,Z){let K=new WeakMap;function H(U){let E=Z.render.frame,q=U.geometry,G=Q.get(U,q);if(K.get(G)!==E)Q.update(G),K.set(G,E);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(K.get(U)!==E){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,E)}}if(U.isSkinnedMesh){let F=U.skeleton;if(K.get(F)!==E)F.update(),K.set(F,E)}return G}function Y(){K=new WeakMap}function X(U){let E=U.target;if(E.removeEventListener("dispose",X),W.releaseStatesOfObject(E),$.remove(E.instanceMatrix),E.instanceColor!==null)$.remove(E.instanceColor)}return{update:H,dispose:Y}}var DX={[O7]:"LINEAR_TONE_MAPPING",[R7]:"REINHARD_TONE_MAPPING",[M7]:"CINEON_TONE_MAPPING",[k7]:"ACES_FILMIC_TONE_MAPPING",[V7]:"AGX_TONE_MAPPING",[B7]:"NEUTRAL_TONE_MAPPING",[L7]:"CUSTOM_TONE_MAPPING"};function FX(J,Q,$,W,Z,K){let H=new fJ(Q,$,{type:J,depthBuffer:Z,stencilBuffer:K,samples:W?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),Y=null,X=null,U=new sJ;U.setAttribute("position",new PJ([-1,3,0,-1,-1,0,3,-1,0],3)),U.setAttribute("uv",new PJ([0,2,0,0,2,0],2));let E=new MQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),q=new jJ(U,E),G=new h9(-1,1,1,-1,0,1),F=null,L=null,z=!1,D,N=null,w=[],y=!1;this.setSize=function(V,I){if(H.setSize(V,I),Y!==null)Y.setSize(V,I);if(X!==null)X.setSize(V,I);for(let A=0;A<w.length;A++){let C=w[A];if(C.setSize)C.setSize(V,I)}},this.setEffects=function(V){w=V,y=w.length>0&&w[0].isRenderPass===!0;let{width:I,height:A}=H;if(w.length>0&&Y===null)Y=new fJ(I,A,{type:J8,depthBuffer:!1,stencilBuffer:!1}),X=new fJ(I,A,{type:J8,depthBuffer:!1,stencilBuffer:!1});for(let C=0;C<w.length;C++){let M=w[C];if(M.setSize)M.setSize(I,A)}},this.begin=function(V,I){if(z)return!1;if(V.toneMapping===cJ&&w.length===0)return!1;if(N=I,I!==null){let{width:A,height:C}=I;if(H.width!==A||H.height!==C)this.setSize(A,C)}if(y===!1)V.setRenderTarget(H);return D=V.toneMapping,V.toneMapping=cJ,!0},this.hasRenderPass=function(){return y},this.end=function(V,I){V.toneMapping=D,z=!0;let A=H,C=Y;for(let M=0;M<w.length;M++){let B=w[M];if(B.enabled===!1)continue;if(B.render(V,C,A,I),B.needsSwap!==!1)A=C,C=C===Y?X:Y}if(F!==V.outputColorSpace||L!==V.toneMapping){if(F=V.outputColorSpace,L=V.toneMapping,E.defines={},x0.getTransfer(F)===e0)E.defines.SRGB_TRANSFER="";let M=DX[L];if(M)E.defines[M]="";E.needsUpdate=!0}E.uniforms.tDiffuse.value=A.texture,V.setRenderTarget(N),V.render(q,G),N=null,z=!1},this.isCompositing=function(){return z},this.dispose=function(){if(H.dispose(),Y!==null)Y.dispose();if(X!==null)X.dispose();U.dispose(),E.dispose()}}var ZZ=new BJ,cQ=new p8(1,1),KZ=new V6,HZ=new qQ,YZ=new C6,gW=[],pW=[],mW=new Float32Array(16),lW=new Float32Array(9),dW=new Float32Array(4);function M9(J,Q,$){let W=J[0];if(W<=0||W>0)return J;let Z=Q*$,K=gW[Z];if(K===void 0)K=new Float32Array(Z),gW[Z]=K;if(Q!==0){W.toArray(K,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(K,Y)}return K}function DJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,W=J.length;$<W;$++)if(J[$]!==Q[$])return!1;return!0}function FJ(J,Q){for(let $=0,W=Q.length;$<W;$++)J[$]=Q[$]}function x6(J,Q){let $=pW[Q];if($===void 0)$=new Int32Array(Q),pW[Q]=$;for(let W=0;W!==Q;++W)$[W]=J.allocateTextureUnit();return $}function OX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function RX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(DJ($,Q))return;J.uniform2fv(this.addr,Q),FJ($,Q)}}function MX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(DJ($,Q))return;J.uniform3fv(this.addr,Q),FJ($,Q)}}function kX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(DJ($,Q))return;J.uniform4fv(this.addr,Q),FJ($,Q)}}function LX(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(DJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),FJ($,Q)}else{if(DJ($,W))return;dW.set(W),J.uniformMatrix2fv(this.addr,!1,dW),FJ($,W)}}function VX(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(DJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),FJ($,Q)}else{if(DJ($,W))return;lW.set(W),J.uniformMatrix3fv(this.addr,!1,lW),FJ($,W)}}function BX(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(DJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),FJ($,Q)}else{if(DJ($,W))return;mW.set(W),J.uniformMatrix4fv(this.addr,!1,mW),FJ($,W)}}function IX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function zX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(DJ($,Q))return;J.uniform2iv(this.addr,Q),FJ($,Q)}}function AX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(DJ($,Q))return;J.uniform3iv(this.addr,Q),FJ($,Q)}}function wX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(DJ($,Q))return;J.uniform4iv(this.addr,Q),FJ($,Q)}}function CX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function _X(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(DJ($,Q))return;J.uniform2uiv(this.addr,Q),FJ($,Q)}}function PX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(DJ($,Q))return;J.uniform3uiv(this.addr,Q),FJ($,Q)}}function TX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(DJ($,Q))return;J.uniform4uiv(this.addr,Q),FJ($,Q)}}function SX(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;let K;if(this.type===J.SAMPLER_2D_SHADOW)cQ.compareFunction=$.isReversedDepthBuffer()?L6:k6,K=cQ;else K=ZZ;$.setTexture2D(Q||K,Z)}function jX(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTexture3D(Q||HZ,Z)}function yX(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTextureCube(Q||YZ,Z)}function vX(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTexture2DArray(Q||KZ,Z)}function fX(J){switch(J){case 5126:return OX;case 35664:return RX;case 35665:return MX;case 35666:return kX;case 35674:return LX;case 35675:return VX;case 35676:return BX;case 5124:case 35670:return IX;case 35667:case 35671:return zX;case 35668:case 35672:return AX;case 35669:case 35673:return wX;case 5125:return CX;case 36294:return _X;case 36295:return PX;case 36296:return TX;case 35678:case 36198:case 36298:case 36306:case 35682:return SX;case 35679:case 36299:case 36307:return jX;case 35680:case 36300:case 36308:case 36293:return yX;case 36289:case 36303:case 36311:case 36292:return vX}}function hX(J,Q){J.uniform1fv(this.addr,Q)}function bX(J,Q){let $=M9(Q,this.size,2);J.uniform2fv(this.addr,$)}function xX(J,Q){let $=M9(Q,this.size,3);J.uniform3fv(this.addr,$)}function gX(J,Q){let $=M9(Q,this.size,4);J.uniform4fv(this.addr,$)}function pX(J,Q){let $=M9(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function mX(J,Q){let $=M9(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function lX(J,Q){let $=M9(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function dX(J,Q){J.uniform1iv(this.addr,Q)}function uX(J,Q){J.uniform2iv(this.addr,Q)}function cX(J,Q){J.uniform3iv(this.addr,Q)}function nX(J,Q){J.uniform4iv(this.addr,Q)}function sX(J,Q){J.uniform1uiv(this.addr,Q)}function iX(J,Q){J.uniform2uiv(this.addr,Q)}function oX(J,Q){J.uniform3uiv(this.addr,Q)}function aX(J,Q){J.uniform4uiv(this.addr,Q)}function rX(J,Q,$){let W=this.cache,Z=Q.length,K=x6($,Z);if(!DJ(W,K))J.uniform1iv(this.addr,K),FJ(W,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=cQ;else H=ZZ;for(let Y=0;Y!==Z;++Y)$.setTexture2D(Q[Y]||H,K[Y])}function tX(J,Q,$){let W=this.cache,Z=Q.length,K=x6($,Z);if(!DJ(W,K))J.uniform1iv(this.addr,K),FJ(W,K);for(let H=0;H!==Z;++H)$.setTexture3D(Q[H]||HZ,K[H])}function eX(J,Q,$){let W=this.cache,Z=Q.length,K=x6($,Z);if(!DJ(W,K))J.uniform1iv(this.addr,K),FJ(W,K);for(let H=0;H!==Z;++H)$.setTextureCube(Q[H]||YZ,K[H])}function JU(J,Q,$){let W=this.cache,Z=Q.length,K=x6($,Z);if(!DJ(W,K))J.uniform1iv(this.addr,K),FJ(W,K);for(let H=0;H!==Z;++H)$.setTexture2DArray(Q[H]||KZ,K[H])}function QU(J){switch(J){case 5126:return hX;case 35664:return bX;case 35665:return xX;case 35666:return gX;case 35674:return pX;case 35675:return mX;case 35676:return lX;case 5124:case 35670:return dX;case 35667:case 35671:return uX;case 35668:case 35672:return cX;case 35669:case 35673:return nX;case 5125:return sX;case 36294:return iX;case 36295:return oX;case 36296:return aX;case 35678:case 36198:case 36298:case 36306:case 35682:return rX;case 35679:case 36299:case 36307:return tX;case 35680:case 36300:case 36308:case 36293:return eX;case 36289:case 36303:case 36311:case 36292:return JU}}class XZ{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=fX(Q.type)}}class UZ{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=QU(Q.type)}}class GZ{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let W=this.seq;for(let Z=0,K=W.length;Z!==K;++Z){let H=W[Z];H.setValue(J,Q[H.id],$)}}}var lQ=/(\w+)(\])?(\[|\.)?/g;function uW(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function $U(J,Q,$){let W=J.name,Z=W.length;lQ.lastIndex=0;while(!0){let K=lQ.exec(W),H=lQ.lastIndex,Y=K[1],X=K[2]==="]",U=K[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===Z){uW($,U===void 0?new XZ(Y,J,Q):new UZ(Y,J,Q));break}else{let q=$.map[Y];if(q===void 0)q=new GZ(Y),uW($,q);$=q}}}class p9{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let H=J.getActiveUniform(Q,K),Y=J.getUniformLocation(Q,H.name);$U(H,Y,this)}let W=[],Z=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)W.push(K);else Z.push(K);if(W.length>0)this.seq=W.concat(Z)}setValue(J,Q,$,W){let Z=this.map[Q];if(Z!==void 0)Z.setValue(J,$,W)}setOptional(J,Q,$){let W=Q[$];if(W!==void 0)this.setValue(J,$,W)}static upload(J,Q,$,W){for(let Z=0,K=Q.length;Z!==K;++Z){let H=Q[Z],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,W)}}static seqWithValue(J,Q){let $=[];for(let W=0,Z=J.length;W!==Z;++W){let K=J[W];if(K.id in Q)$.push(K)}return $}}function cW(J,Q,$){let W=J.createShader(Q);return J.shaderSource(W,$),J.compileShader(W),W}var WU=37297,ZU=0;function KU(J,Q){let $=J.split(`
`),W=[],Z=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let H=Z;H<K;H++){let Y=H+1;W.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return W.join(`
`)}var nW=new S0;function HU(J){x0._getMatrix(nW,x0.workingColorSpace,J);let Q=`mat3( ${nW.elements.map(($)=>$.toFixed(4))} )`;switch(x0.getTransfer(J)){case YQ:return[Q,"LinearTransferOETF"];case e0:return[Q,"sRGBTransferOETF"];default:return P0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function sW(J,Q,$){let W=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(W&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+K+`

`+KU(J.getShaderSource(Q),Y)}else return K}function YU(J,Q){let $=HU(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var XU={[O7]:"Linear",[R7]:"Reinhard",[M7]:"Cineon",[k7]:"ACESFilmic",[V7]:"AgX",[B7]:"Neutral",[L7]:"Custom"};function UU(J,Q){let $=XU[Q];if($===void 0)return P0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var h6=new x;function GU(){x0.getLuminanceCoefficients(h6);let J=h6.x.toFixed(4),Q=h6.y.toFixed(4),$=h6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function NU(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(g9).join(`
`)}function EU(J){let Q=[];for(let $ in J){let W=J[$];if(W===!1)continue;Q.push("#define "+$+" "+W)}return Q.join(`
`)}function qU(J,Q){let $={},W=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let Z=0;Z<W;Z++){let K=J.getActiveAttrib(Q,Z),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;$[H]={type:K.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function g9(J){return J!==""}function iW(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,Q.numSunLights).replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,Q.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function oW(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var DU=/^[ \t]*#include +<([\w\d./]+)>/gm;function nQ(J){return J.replace(DU,OU)}var FU=new Map;function OU(J,Q){let $=v0[Q];if($===void 0){let W=FU.get(Q);if(W!==void 0)$=v0[W],P0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,W);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return nQ($)}var RU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function aW(J){return J.replace(RU,MU)}function MU(J,Q,$,W){let Z="";for(let K=parseInt(Q);K<parseInt($);K++)Z+=W.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return Z}function rW(J){let Q=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}var kU={[A9]:"SHADOWMAP_TYPE_PCF",[U9]:"SHADOWMAP_TYPE_VSM"};function LU(J){return kU[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var VU={[E9]:"ENVMAP_TYPE_CUBE",[j8]:"ENVMAP_TYPE_CUBE",[C9]:"ENVMAP_TYPE_CUBE_UV"};function BU(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return VU[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var IU={[j8]:"ENVMAP_MODE_REFRACTION"};function zU(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return IU[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var AU={[ZW]:"ENVMAP_BLENDING_MULTIPLY",[KW]:"ENVMAP_BLENDING_MIX",[HW]:"ENVMAP_BLENDING_ADD"};function wU(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return AU[J.combine]||"ENVMAP_BLENDING_NONE"}function CU(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,W=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:W,maxMip:$}}function _U(J,Q,$,W){let Z=J.getContext(),K=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=LU($),U=BU($),E=zU($),q=wU($),G=CU($),F=NU($),L=EU(K),z=Z.createProgram(),D,N,w=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,L].filter(g9).join(`
`),D.length>0)D+=`
`;if(N=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,L].filter(g9).join(`
`),N.length>0)N+=`
`}else D=[rW($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,L,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+E:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(g9).join(`
`),N=[rW($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,L,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+E:"",$.envMap?"#define "+q:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.retroreflection?"#define USE_RETROREFLECTION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==cJ?"#define TONE_MAPPING":"",$.toneMapping!==cJ?v0.tonemapping_pars_fragment:"",$.toneMapping!==cJ?UU("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",v0.colorspace_pars_fragment,YU("linearToOutputTexel",$.outputColorSpace),GU(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(g9).join(`
`);if(H=nQ(H),H=iW(H,$),H=oW(H,$),Y=nQ(Y),Y=iW(Y,$),Y=oW(Y,$),H=aW(H),Y=aW(Y),$.isRawShaderMaterial!==!0)w=`#version 300 es
`,D=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,N=["#define varying in",$.glslVersion===XQ?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===XQ?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+N;let y=w+D+H,V=w+N+Y,I=cW(Z,Z.VERTEX_SHADER,y),A=cW(Z,Z.FRAGMENT_SHADER,V);if(Z.attachShader(z,I),Z.attachShader(z,A),$.index0AttributeName!==void 0)Z.bindAttribLocation(z,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)Z.bindAttribLocation(z,0,"position");Z.linkProgram(z);function C(v){if(J.debug.checkShaderErrors){let f=Z.getProgramInfoLog(z)||"",r=Z.getShaderInfoLog(I)||"",S=Z.getShaderInfoLog(A)||"",d=f.trim(),o=r.trim(),m=S.trim(),Q0=!0,c=!0;if(Z.getProgramParameter(z,Z.LINK_STATUS)===!1)if(Q0=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(Z,z,I,A);else{let a=sW(Z,I,"vertex"),J0=sW(Z,A,"fragment");T0("WebGLProgram: Shader Error "+Z.getError()+" - VALIDATE_STATUS "+Z.getProgramParameter(z,Z.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+d+`
`+a+`
`+J0)}else if(d!=="")P0("WebGLProgram: Program Info Log:",d);else if(o===""||m==="")c=!1;if(c)v.diagnostics={runnable:Q0,programLog:d,vertexShader:{log:o,prefix:D},fragmentShader:{log:m,prefix:N}}}Z.deleteShader(I),Z.deleteShader(A),M=new p9(Z,z),B=qU(Z,z)}let M;this.getUniforms=function(){if(M===void 0)C(this);return M};let B;this.getAttributes=function(){if(B===void 0)C(this);return B};let l=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(l===!1)l=Z.getProgramParameter(z,WU);return l},this.destroy=function(){W.releaseStatesOfProgram(this),Z.deleteProgram(z),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=ZU++,this.cacheKey=Q,this.usedTimes=1,this.program=z,this.vertexShader=I,this.fragmentShader=A,this}var PU=0;class NZ{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let W=this._getShaderCacheForMaterial(J);if(W.has(Q)===!1)W.add(Q),Q.usedTimes++;if(W.has($)===!1)W.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new EZ(J),Q.set(J,$);return $}}class EZ{constructor(J){this.id=PU++,this.code=J,this.usedTimes=0}}function TU(J){return J===h8||J===R6||J===M6}function SU(J,Q,$,W,Z,K){let H=new B6,Y=new NZ,X=new Set,U=[],E=new Map,q=W.logarithmicDepthBuffer,G=W.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function L(M){if(X.add(M),M===0)return"uv";return`uv${M}`}function z(M,B,l,v,f,r){let S=v.fog,d=f.geometry,o=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?v.environment:null,m=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,Q0=Q.get(M.envMap||o,m),c=!!Q0&&Q0.mapping===C9?Q0.image.height:null,a=F[M.type];if(M.precision!==null){if(G=W.getMaxPrecision(M.precision),G!==M.precision)P0("WebGLProgram.getParameters:",M.precision,"not supported, using",G,"instead.")}let J0=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,C0=J0!==void 0?J0.length:0,z0=0;if(d.morphAttributes.position!==void 0)z0=1;if(d.morphAttributes.normal!==void 0)z0=2;if(d.morphAttributes.color!==void 0)z0=3;let JJ,f0,n,$0;if(a){let QJ=W8[a];JJ=QJ.vertexShader,f0=QJ.fragmentShader}else{JJ=M.vertexShader,f0=M.fragmentShader;let QJ=Y.getVertexShaderStage(M),s0=Y.getFragmentShaderStage(M);Y.update(M,QJ,s0),n=QJ.id,$0=s0.id}let Z0=J.getRenderTarget(),A0=J.state.buffers.depth.getReversed(),_0=f.isInstancedMesh===!0,B0=f.isBatchedMesh===!0,NJ=!!M.map,b0=!!M.matcap,l0=!!Q0,o0=!!M.aoMap,d0=!!M.lightMap,RJ=!!M.bumpMap&&M.wireframe===!1,WJ=!!M.normalMap,wJ=!!M.displacementMap,EJ=!!M.emissiveMap,qJ=!!M.metalnessMap,P=!!M.roughnessMap,CJ=M.anisotropy>0,n0=M.clearcoat>0,YJ=M.dispersion>0,k=M.retroreflectivity>0,O=M.iridescence>0,_=M.sheen>0,g=M.transmission>0,e=CJ&&!!M.anisotropyMap,K0=n0&&!!M.clearcoatMap,X0=n0&&!!M.clearcoatNormalMap,u=n0&&!!M.clearcoatRoughnessMap,i=O&&!!M.iridescenceMap,D0=O&&!!M.iridescenceThicknessMap,V0=_&&!!M.sheenColorMap,U0=_&&!!M.sheenRoughnessMap,W0=!!M.specularMap,I0=!!M.specularColorMap,w0=!!M.specularIntensityMap,c0=g&&!!M.transmissionMap,j=g&&!!M.thicknessMap,H0=!!M.gradientMap,s=!!M.alphaMap,Y0=M.alphaTest>0,F0=!!M.alphaHash,t=!!M.extensions,N0=cJ;if(M.toneMapped){if(Z0===null||Z0.isXRRenderTarget===!0)N0=J.toneMapping}let j0={shaderID:a,shaderType:M.type,shaderName:M.name,vertexShader:JJ,fragmentShader:f0,defines:M.defines,customVertexShaderID:n,customFragmentShaderID:$0,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:G,batching:B0,batchingColor:B0&&f._colorsTexture!==null,instancing:_0,instancingColor:_0&&f.instanceColor!==null,instancingMorph:_0&&f.morphTexture!==null,outputColorSpace:Z0===null?J.outputColorSpace:Z0.isXRRenderTarget===!0?Z0.texture.colorSpace:x0.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:NJ,matcap:b0,envMap:l0,envMapMode:l0&&Q0.mapping,envMapCubeUVHeight:c,aoMap:o0,lightMap:d0,bumpMap:RJ,normalMap:WJ,displacementMap:wJ,emissiveMap:EJ,normalMapObjectSpace:WJ&&M.normalMapType===RW,normalMapTangentSpace:WJ&&M.normalMapType===KQ,packedNormalMap:WJ&&M.normalMapType===KQ&&TU(M.normalMap.format),metalnessMap:qJ,roughnessMap:P,anisotropy:CJ,anisotropyMap:e,clearcoat:n0,clearcoatMap:K0,clearcoatNormalMap:X0,clearcoatRoughnessMap:u,dispersion:YJ,retroreflection:k,iridescence:O,iridescenceMap:i,iridescenceThicknessMap:D0,sheen:_,sheenColorMap:V0,sheenRoughnessMap:U0,specularMap:W0,specularColorMap:I0,specularIntensityMap:w0,transmission:g,transmissionMap:c0,thicknessMap:j,gradientMap:H0,opaque:M.transparent===!1&&M.blending===w9&&M.alphaToCoverage===!1,alphaMap:s,alphaTest:Y0,alphaHash:F0,combine:M.combine,mapUv:NJ&&L(M.map.channel),aoMapUv:o0&&L(M.aoMap.channel),lightMapUv:d0&&L(M.lightMap.channel),bumpMapUv:RJ&&L(M.bumpMap.channel),normalMapUv:WJ&&L(M.normalMap.channel),displacementMapUv:wJ&&L(M.displacementMap.channel),emissiveMapUv:EJ&&L(M.emissiveMap.channel),metalnessMapUv:qJ&&L(M.metalnessMap.channel),roughnessMapUv:P&&L(M.roughnessMap.channel),anisotropyMapUv:e&&L(M.anisotropyMap.channel),clearcoatMapUv:K0&&L(M.clearcoatMap.channel),clearcoatNormalMapUv:X0&&L(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:u&&L(M.clearcoatRoughnessMap.channel),iridescenceMapUv:i&&L(M.iridescenceMap.channel),iridescenceThicknessMapUv:D0&&L(M.iridescenceThicknessMap.channel),sheenColorMapUv:V0&&L(M.sheenColorMap.channel),sheenRoughnessMapUv:U0&&L(M.sheenRoughnessMap.channel),specularMapUv:W0&&L(M.specularMap.channel),specularColorMapUv:I0&&L(M.specularColorMap.channel),specularIntensityMapUv:w0&&L(M.specularIntensityMap.channel),transmissionMapUv:c0&&L(M.transmissionMap.channel),thicknessMapUv:j&&L(M.thicknessMap.channel),alphaMapUv:s&&L(M.alphaMap.channel),vertexTangents:!!d.attributes.tangent&&(WJ||CJ),vertexNormals:!!d.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!d.attributes.color&&d.attributes.color.itemSize===4,pointsUvs:f.isPoints===!0&&!!d.attributes.uv&&(NJ||s),fog:!!S,useFog:M.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||d.attributes.normal===void 0&&WJ===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:q,reversedDepthBuffer:A0,skinning:f.isSkinnedMesh===!0,hasPositionAttribute:d.attributes.position!==void 0,morphTargets:d.morphAttributes.position!==void 0,morphNormals:d.morphAttributes.normal!==void 0,morphColors:d.morphAttributes.color!==void 0,morphTargetsCount:C0,morphTextureStride:z0,numSunLights:B.sun.length,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numSunLightShadows:B.sunShadowMap.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:r.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:M.dithering,shadowMapEnabled:J.shadowMap.enabled&&l.length>0,shadowMapType:J.shadowMap.type,toneMapping:N0,decodeVideoTexture:NJ&&M.map.isVideoTexture===!0&&x0.getTransfer(M.map.colorSpace)===e0,decodeVideoTextureEmissive:EJ&&M.emissiveMap.isVideoTexture===!0&&x0.getTransfer(M.emissiveMap.colorSpace)===e0,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===tJ,flipSided:M.side===TJ,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:t&&M.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(t&&M.extensions.multiDraw===!0||B0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return j0.vertexUv1s=X.has(1),j0.vertexUv2s=X.has(2),j0.vertexUv3s=X.has(3),X.clear(),j0}function D(M){let B=[];if(M.shaderID)B.push(M.shaderID);else B.push(M.customVertexShaderID),B.push(M.customFragmentShaderID);if(M.defines!==void 0)for(let l in M.defines)B.push(l),B.push(M.defines[l]);if(M.isRawShaderMaterial===!1)N(B,M),w(B,M),B.push(J.outputColorSpace);return B.push(M.customProgramCacheKey),B.join()}function N(M,B){M.push(B.precision),M.push(B.outputColorSpace),M.push(B.envMapMode),M.push(B.envMapCubeUVHeight),M.push(B.mapUv),M.push(B.alphaMapUv),M.push(B.lightMapUv),M.push(B.aoMapUv),M.push(B.bumpMapUv),M.push(B.normalMapUv),M.push(B.displacementMapUv),M.push(B.emissiveMapUv),M.push(B.metalnessMapUv),M.push(B.roughnessMapUv),M.push(B.anisotropyMapUv),M.push(B.clearcoatMapUv),M.push(B.clearcoatNormalMapUv),M.push(B.clearcoatRoughnessMapUv),M.push(B.iridescenceMapUv),M.push(B.iridescenceThicknessMapUv),M.push(B.sheenColorMapUv),M.push(B.sheenRoughnessMapUv),M.push(B.specularMapUv),M.push(B.specularColorMapUv),M.push(B.specularIntensityMapUv),M.push(B.transmissionMapUv),M.push(B.thicknessMapUv),M.push(B.combine),M.push(B.fogExp2),M.push(B.sizeAttenuation),M.push(B.morphTargetsCount),M.push(B.morphAttributeCount),M.push(B.numSunLights),M.push(B.numDirLights),M.push(B.numPointLights),M.push(B.numSpotLights),M.push(B.numSpotLightMaps),M.push(B.numHemiLights),M.push(B.numRectAreaLights),M.push(B.numSunLightShadows),M.push(B.numDirLightShadows),M.push(B.numPointLightShadows),M.push(B.numSpotLightShadows),M.push(B.numSpotLightShadowsWithMaps),M.push(B.numLightProbes),M.push(B.shadowMapType),M.push(B.toneMapping),M.push(B.numClippingPlanes),M.push(B.numClipIntersection),M.push(B.depthPacking)}function w(M,B){if(H.disableAll(),B.instancing)H.enable(0);if(B.instancingColor)H.enable(1);if(B.instancingMorph)H.enable(2);if(B.matcap)H.enable(3);if(B.envMap)H.enable(4);if(B.normalMapObjectSpace)H.enable(5);if(B.normalMapTangentSpace)H.enable(6);if(B.clearcoat)H.enable(7);if(B.iridescence)H.enable(8);if(B.alphaTest)H.enable(9);if(B.vertexColors)H.enable(10);if(B.vertexAlphas)H.enable(11);if(B.vertexUv1s)H.enable(12);if(B.vertexUv2s)H.enable(13);if(B.vertexUv3s)H.enable(14);if(B.vertexTangents)H.enable(15);if(B.anisotropy)H.enable(16);if(B.alphaHash)H.enable(17);if(B.batching)H.enable(18);if(B.dispersion)H.enable(19);if(B.retroreflection)H.enable(24);if(B.batchingColor)H.enable(20);if(B.gradientMap)H.enable(21);if(B.packedNormalMap)H.enable(22);if(B.vertexNormals)H.enable(23);if(M.push(H.mask),H.disableAll(),B.fog)H.enable(0);if(B.useFog)H.enable(1);if(B.flatShading)H.enable(2);if(B.logarithmicDepthBuffer)H.enable(3);if(B.reversedDepthBuffer)H.enable(4);if(B.skinning)H.enable(5);if(B.morphTargets)H.enable(6);if(B.morphNormals)H.enable(7);if(B.morphColors)H.enable(8);if(B.premultipliedAlpha)H.enable(9);if(B.shadowMapEnabled)H.enable(10);if(B.doubleSided)H.enable(11);if(B.flipSided)H.enable(12);if(B.useDepthPacking)H.enable(13);if(B.dithering)H.enable(14);if(B.transmission)H.enable(15);if(B.sheen)H.enable(16);if(B.opaque)H.enable(17);if(B.pointsUvs)H.enable(18);if(B.decodeVideoTexture)H.enable(19);if(B.decodeVideoTextureEmissive)H.enable(20);if(B.alphaToCoverage)H.enable(21);if(B.numLightProbeGrids>0)H.enable(22);if(B.hasPositionAttribute)H.enable(23);M.push(H.mask)}function y(M){let B=F[M.type],l;if(B){let v=W8[B];l=TW.clone(v.uniforms)}else l=M.uniforms;return l}function V(M,B){let l=E.get(B);if(l!==void 0)++l.usedTimes;else l=new _U(J,B,M,Z),U.push(l),E.set(B,l);return l}function I(M){if(--M.usedTimes===0){let B=U.indexOf(M);U[B]=U[U.length-1],U.pop(),E.delete(M.cacheKey),M.destroy()}}function A(M){Y.remove(M)}function C(){Y.dispose()}return{getParameters:z,getProgramCacheKey:D,getUniforms:y,acquireProgram:V,releaseProgram:I,releaseShaderCache:A,programs:U,dispose:C}}function jU(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function W(H){J.delete(H)}function Z(H,Y,X){J.get(H)[Y]=X}function K(){J=new WeakMap}return{has:Q,get:$,remove:W,update:Z,dispose:K}}function yU(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function tW(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function eW(){let J=[],Q=0,$=[],W=[],Z=[];function K(){Q=0,$.length=0,W.length=0,Z.length=0}function H(G){let F=0;if(G.isInstancedMesh)F+=2;if(G.isSkinnedMesh)F+=1;return F}function Y(G,F,L,z,D,N){let w=J[Q];if(w===void 0)w={id:G.id,object:G,geometry:F,material:L,materialVariant:H(G),groupOrder:z,renderOrder:G.renderOrder,z:D,group:N},J[Q]=w;else w.id=G.id,w.object=G,w.geometry=F,w.material=L,w.materialVariant=H(G),w.groupOrder=z,w.renderOrder=G.renderOrder,w.z=D,w.group=N;return Q++,w}function X(G,F,L,z,D,N,w){if(w.reversedDepth===!0)D=-D;let y=Y(G,F,L,z,D,N);if(L.transmission>0)W.push(y);else if(L.transparent===!0)Z.push(y);else $.push(y)}function U(G,F,L,z,D,N){let w=Y(G,F,L,z,D,N);if(L.transmission>0)W.unshift(w);else if(L.transparent===!0)Z.unshift(w);else $.unshift(w)}function E(G,F){if($.length>1)$.sort(G||yU);if(W.length>1)W.sort(F||tW);if(Z.length>1)Z.sort(F||tW)}function q(){for(let G=Q,F=J.length;G<F;G++){let L=J[G];if(L.id===null)break;L.id=null,L.object=null,L.geometry=null,L.material=null,L.group=null}}return{opaque:$,transmissive:W,transparent:Z,init:K,push:X,unshift:U,finish:q,sort:E}}function vU(){let J=new WeakMap;function Q(W,Z){let K=J.get(W),H;if(K===void 0)H=new eW,J.set(W,[H]);else if(Z>=K.length)H=new eW,K.push(H);else H=K[Z];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function fU(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={direction:new x,color:new m0};break;case"SpotLight":$={position:new x,direction:new x,color:new m0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new x,color:new m0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new x,skyColor:new m0,groundColor:new m0};break;case"RectAreaLight":$={color:new m0,position:new x,halfWidth:new x,halfHeight:new x};break}return J[Q.id]=$,$}}}function hU(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new p0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new p0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new p0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var bU=0;function xU(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function gU(J){let Q=new fU,$=hU(),W={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)W.probe.push(new x);let Z=new x,K=new KJ,H=new KJ;function Y(U){let E=0,q=0,G=0;for(let f=0;f<9;f++)W.probe[f].set(0,0,0);let F=0,L=0,z=0,D=0,N=0,w=0,y=0,V=0,I=0,A=0,C=0,M=0,B=0,l=0;U.sort(xU);for(let f=0,r=U.length;f<r;f++){let S=U[f],d=S.color,o=S.intensity,m=S.distance,Q0=null;if(S.shadow&&S.shadow.map)if(S.shadow.map.texture.format===h8)Q0=S.shadow.map.texture;else Q0=S.shadow.map.depthTexture||S.shadow.map.texture;if(S.isAmbientLight)E+=d.r*o,q+=d.g*o,G+=d.b*o;else if(S.isLightProbe){for(let c=0;c<9;c++)W.probe[c].addScaledVector(S.sh.coefficients[c],o);l++}else if(S.isSunLight){let c=Q.get(S);if(c.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let a=S.shadow,J0=$.get(S);J0.shadowIntensity=a.intensity,J0.shadowBias=a.bias,J0.shadowNormalBias=a.normalBias,J0.shadowRadius=a.radius,J0.shadowMapSize.copy(a.mapSize).multiply(a.getFrameExtents()),W.sunShadow[L]=J0,W.sunShadowMap[L]=Q0;let C0=a.getViewportCount();for(let z0=0;z0<C0;z0++)W.sunShadowMatrix[z+z0]=a.getMatrix(z0),W.sunShadowCascade[z+z0]=a._cascadeData[z0];z+=C0,L++}W.sun[F]=c,F++}else if(S.isDirectionalLight){let c=Q.get(S);if(c.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let a=S.shadow,J0=$.get(S);J0.shadowIntensity=a.intensity,J0.shadowBias=a.bias,J0.shadowNormalBias=a.normalBias,J0.shadowRadius=a.radius,J0.shadowMapSize=a.mapSize,W.directionalShadow[D]=J0,W.directionalShadowMap[D]=Q0,W.directionalShadowMatrix[D]=S.shadow.matrix,I++}W.directional[D]=c,D++}else if(S.isSpotLight){let c=Q.get(S);c.position.setFromMatrixPosition(S.matrixWorld),c.color.copy(d).multiplyScalar(o),c.distance=m,c.coneCos=Math.cos(S.angle),c.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),c.decay=S.decay,W.spot[w]=c;let a=S.shadow;if(S.map){if(W.spotLightMap[M]=S.map,M++,a.updateMatrices(S),S.castShadow)B++}if(W.spotLightMatrix[w]=a.matrix,S.castShadow){let J0=$.get(S);J0.shadowIntensity=a.intensity,J0.shadowBias=a.bias,J0.shadowNormalBias=a.normalBias,J0.shadowRadius=a.radius,J0.shadowMapSize=a.mapSize,W.spotShadow[w]=J0,W.spotShadowMap[w]=Q0,C++}w++}else if(S.isRectAreaLight){let c=Q.get(S);c.color.copy(d).multiplyScalar(o),c.halfWidth.set(S.width*0.5,0,0),c.halfHeight.set(0,S.height*0.5,0),W.rectArea[y]=c,y++}else if(S.isPointLight){let c=Q.get(S);if(c.color.copy(S.color).multiplyScalar(S.intensity),c.distance=S.distance,c.decay=S.decay,S.castShadow){let a=S.shadow,J0=$.get(S);J0.shadowIntensity=a.intensity,J0.shadowBias=a.bias,J0.shadowNormalBias=a.normalBias,J0.shadowRadius=a.radius,J0.shadowMapSize=a.mapSize,J0.shadowCameraNear=a.camera.near,J0.shadowCameraFar=a.camera.far,W.pointShadow[N]=J0,W.pointShadowMap[N]=Q0,W.pointShadowMatrix[N]=S.shadow.matrix,A++}W.point[N]=c,N++}else if(S.isHemisphereLight){let c=Q.get(S);c.skyColor.copy(S.color).multiplyScalar(o),c.groundColor.copy(S.groundColor).multiplyScalar(o),W.hemi[V]=c,V++}}if(y>0)if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=G0.LTC_FLOAT_1,W.rectAreaLTC2=G0.LTC_FLOAT_2;else W.rectAreaLTC1=G0.LTC_HALF_1,W.rectAreaLTC2=G0.LTC_HALF_2;W.ambient[0]=E,W.ambient[1]=q,W.ambient[2]=G;let v=W.hash;if(v.sunLength!==F||v.directionalLength!==D||v.pointLength!==N||v.spotLength!==w||v.rectAreaLength!==y||v.hemiLength!==V||v.numSunShadows!==L||v.numDirectionalShadows!==I||v.numPointShadows!==A||v.numSpotShadows!==C||v.numSpotMaps!==M||v.numLightProbes!==l)W.sun.length=F,W.directional.length=D,W.spot.length=w,W.rectArea.length=y,W.point.length=N,W.hemi.length=V,W.sunShadow.length=L,W.sunShadowMap.length=L,W.sunShadowMatrix.length=z,W.sunShadowCascade.length=z,W.directionalShadow.length=I,W.directionalShadowMap.length=I,W.directionalShadowMatrix.length=I,W.pointShadow.length=A,W.pointShadowMap.length=A,W.pointShadowMatrix.length=A,W.spotShadow.length=C,W.spotShadowMap.length=C,W.spotLightMatrix.length=C+M-B,W.spotLightMap.length=M,W.numSpotLightShadowsWithMaps=B,W.numLightProbes=l,v.sunLength=F,v.directionalLength=D,v.pointLength=N,v.spotLength=w,v.rectAreaLength=y,v.hemiLength=V,v.numSunShadows=L,v.numDirectionalShadows=I,v.numPointShadows=A,v.numSpotShadows=C,v.numSpotMaps=M,v.numLightProbes=l,W.version=bU++}function X(U,E){let q=0,G=0,F=0,L=0,z=0,D=0,N=E.matrixWorldInverse;for(let w=0,y=U.length;w<y;w++){let V=U[w];if(V.isSunLight){let I=W.sun[q];I.direction.setFromMatrixPosition(V.matrixWorld),I.direction.transformDirection(N),q++}else if(V.isDirectionalLight){let I=W.directional[G];I.direction.setFromMatrixPosition(V.matrixWorld),Z.setFromMatrixPosition(V.target.matrixWorld),I.direction.sub(Z),I.direction.transformDirection(N),G++}else if(V.isSpotLight){let I=W.spot[L];I.position.setFromMatrixPosition(V.matrixWorld),I.position.applyMatrix4(N),I.direction.setFromMatrixPosition(V.matrixWorld),Z.setFromMatrixPosition(V.target.matrixWorld),I.direction.sub(Z),I.direction.transformDirection(N),L++}else if(V.isRectAreaLight){let I=W.rectArea[z];I.position.setFromMatrixPosition(V.matrixWorld),I.position.applyMatrix4(N),H.identity(),K.copy(V.matrixWorld),K.premultiply(N),H.extractRotation(K),I.halfWidth.set(V.width*0.5,0,0),I.halfHeight.set(0,V.height*0.5,0),I.halfWidth.applyMatrix4(H),I.halfHeight.applyMatrix4(H),z++}else if(V.isPointLight){let I=W.point[F];I.position.setFromMatrixPosition(V.matrixWorld),I.position.applyMatrix4(N),F++}else if(V.isHemisphereLight){let I=W.hemi[D];I.direction.setFromMatrixPosition(V.matrixWorld),I.direction.transformDirection(N),D++}}}return{setup:Y,setupView:X,state:W}}function JZ(J){let Q=new gU(J),$=[],W=[],Z=[];function K(G){q.camera=G,$.length=0,W.length=0,Z.length=0}function H(G){$.push(G)}function Y(G){W.push(G)}function X(G){Z.push(G)}function U(){Q.setup($)}function E(G){Q.setupView($,G)}let q={lightsArray:$,shadowsArray:W,lightProbeGridArray:Z,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:q,setupLights:U,setupLightsView:E,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function pU(J){let Q=new WeakMap;function $(Z,K=0){let H=Q.get(Z),Y;if(H===void 0)Y=new JZ(J),Q.set(Z,[Y]);else if(K>=H.length)Y=new JZ(J),H.push(Y);else Y=H[K];return Y}function W(){Q=new WeakMap}return{get:$,dispose:W}}var mU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,dU=[new x(1,0,0),new x(-1,0,0),new x(0,1,0),new x(0,-1,0),new x(0,0,1),new x(0,0,-1)],uU=[new x(0,-1,0),new x(0,-1,0),new x(0,0,1),new x(0,0,-1),new x(0,-1,0),new x(0,-1,0)],QZ=new KJ,x9=new x,dQ=new x;function cU(J,Q,$){let W=new v9,Z=new p0,K=new p0,H=new HJ,Y=new kQ,X=new LQ,U={},E=$.maxTextureSize,q={[G9]:TJ,[TJ]:G9,[tJ]:tJ},G=new gJ({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new p0},radius:{value:4}},vertexShader:mU,fragmentShader:lU}),F=G.clone();F.defines.HORIZONTAL_PASS=1;let L=new sJ;L.setAttribute("position",new uJ(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let z=new jJ(L,G),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=A9;let N=this.type;this.render=function(A,C,M){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(A.length===0)return;if(this.type===T$)P0("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=A9;let B=J.getRenderTarget(),l=J.getActiveCubeFace(),v=J.getActiveMipmapLevel(),f=J.state;if(f.setBlending(eJ),f.buffers.depth.getReversed()===!0)f.buffers.color.setClear(0,0,0,0);else f.buffers.color.setClear(1,1,1,1);f.buffers.depth.setTest(!0),f.setScissorTest(!1);let r=N!==this.type;if(r)C.traverse(function(S){if(S.material)if(Array.isArray(S.material))S.material.forEach((d)=>d.needsUpdate=!0);else S.material.needsUpdate=!0});for(let S=0,d=A.length;S<d;S++){let o=A[S],m=o.shadow;if(m===void 0){P0("WebGLShadowMap:",o,"has no shadow.");continue}if(m.autoUpdate===!1&&m.needsUpdate===!1)continue;Z.copy(m.mapSize);let Q0=m.getFrameExtents();if(Z.multiply(Q0),K.copy(m.mapSize),Z.x>E||Z.y>E){if(Z.x>E)K.x=Math.floor(E/Q0.x),Z.x=K.x*Q0.x,m.mapSize.x=K.x;if(Z.y>E)K.y=Math.floor(E/Q0.y),Z.y=K.y*Q0.y,m.mapSize.y=K.y}let c=J.state.buffers.depth.getReversed();if(m.camera._reversedDepth=c,m.map===null||r===!0){if(m.map!==null){if(m.map.depthTexture!==null)m.map.depthTexture.dispose(),m.map.depthTexture=null;m.map.dispose()}if(this.type===U9){if(o.isPointLight){P0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}m.map=new fJ(Z.x,Z.y,{format:h8,type:J8,minFilter:SJ,magFilter:SJ,generateMipmaps:!1}),m.map.texture.name=o.name+".shadowMap",m.map.depthTexture=new p8(Z.x,Z.y,E8),m.map.depthTexture.name=o.name+".shadowMapDepth",m.map.depthTexture.format=v8,m.map.depthTexture.compareFunction=null,m.map.depthTexture.minFilter=z8,m.map.depthTexture.magFilter=z8}else{if(o.isPointLight)m.map=new sQ(Z.x),m.map.depthTexture=new OQ(Z.x,A8);else m.map=new fJ(Z.x,Z.y),m.map.depthTexture=new p8(Z.x,Z.y,A8);if(m.map.depthTexture.name=o.name+".shadowMap",m.map.depthTexture.format=v8,this.type===A9)m.map.depthTexture.compareFunction=c?L6:k6,m.map.depthTexture.minFilter=SJ,m.map.depthTexture.magFilter=SJ;else m.map.depthTexture.compareFunction=null,m.map.depthTexture.minFilter=z8,m.map.depthTexture.magFilter=z8}m.camera.updateProjectionMatrix()}if(m.map.isWebGLCubeRenderTarget!==!0&&(m.map.width!==Z.x||m.map.height!==Z.y))m.map.setSize(Z.x,Z.y);let a=m.map.isWebGLCubeRenderTarget?6:m.getViewportCount();if(o.isPointLight!==!0)m.updateMatrices(o,M);for(let J0=0;J0<a;J0++){let C0=m.getCamera(J0);if(o.isPointLight){let{camera:z0,matrix:JJ}=m,f0=o.distance||z0.far;if(f0!==z0.far)z0.far=f0,z0.updateProjectionMatrix();x9.setFromMatrixPosition(o.matrixWorld),z0.position.copy(x9),dQ.copy(z0.position),dQ.add(dU[J0]),z0.up.copy(uU[J0]),z0.lookAt(dQ),z0.updateMatrixWorld(),JJ.makeTranslation(-x9.x,-x9.y,-x9.z),QZ.multiplyMatrices(z0.projectionMatrix,z0.matrixWorldInverse),m._frustum.setFromProjectionMatrix(QZ,z0.coordinateSystem,z0.reversedDepth)}if(m.map.isWebGLCubeRenderTarget)J.setRenderTarget(m.map,J0),J.clear();else{if(J0===0)J.setRenderTarget(m.map),J.clear();let z0=m.getViewport(J0);H.set(K.x*z0.x,K.y*z0.y,K.x*z0.z,K.y*z0.w),f.viewport(H)}W=m.getFrustum(J0),V(C,M,C0,o,this.type)}if(m.isPointLightShadow!==!0&&this.type===U9)w(m,M);m.needsUpdate=!1}N=this.type,D.needsUpdate=!1,J.setRenderTarget(B,l,v)};function w(A,C){let M=Q.update(z);if(G.defines.VSM_SAMPLES!==A.blurSamples)G.defines.VSM_SAMPLES=A.blurSamples,F.defines.VSM_SAMPLES=A.blurSamples,G.needsUpdate=!0,F.needsUpdate=!0;if(A.mapPass===null)A.mapPass=new fJ(Z.x,Z.y,{format:h8,type:J8});else if(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)A.mapPass.setSize(A.map.width,A.map.height);G.uniforms.shadow_pass.value=A.map.depthTexture,G.uniforms.resolution.value.set(A.map.width,A.map.height),G.uniforms.radius.value=A.radius,J.setRenderTarget(A.mapPass),J.clear(),J.renderBufferDirect(C,null,M,G,z,null),F.uniforms.shadow_pass.value=A.mapPass.texture,F.uniforms.resolution.value.set(A.map.width,A.map.height),F.uniforms.radius.value=A.radius,J.setRenderTarget(A.map),J.clear(),J.renderBufferDirect(C,null,M,F,z,null)}function y(A,C,M,B){let l=null,v=M.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(v!==void 0)l=v;else if(l=M.isPointLight===!0?X:Y,J.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let f=l.uuid,r=C.uuid,S=U[f];if(S===void 0)S={},U[f]=S;let d=S[r];if(d===void 0)d=l.clone(),S[r]=d,C.addEventListener("dispose",I);l=d}if(l.visible=C.visible,l.wireframe=C.wireframe,B===U9)l.side=C.shadowSide!==null?C.shadowSide:C.side;else l.side=C.shadowSide!==null?C.shadowSide:q[C.side];if(l.alphaMap=C.alphaMap,l.alphaTest=C.alphaToCoverage===!0?0.5:C.alphaTest,l.map=C.map,l.clipShadows=C.clipShadows,l.clippingPlanes=C.clippingPlanes,l.clipIntersection=C.clipIntersection,l.displacementMap=C.displacementMap,l.displacementScale=C.displacementScale,l.displacementBias=C.displacementBias,l.wireframeLinewidth=C.wireframeLinewidth,l.linewidth=C.linewidth,M.isPointLight===!0&&l.isMeshDistanceMaterial===!0){let f=J.properties.get(l);f.light=M}return l}function V(A,C,M,B,l){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)){if((A.castShadow||A.receiveShadow&&l===U9)&&(!A.frustumCulled||A.intersectsFrustum(W))){A.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,A.matrixWorld);let r=Q.update(A),S=A.material;if(Array.isArray(S)){let d=r.groups;for(let o=0,m=d.length;o<m;o++){let Q0=d[o],c=S[Q0.materialIndex];if(c&&c.visible){let a=y(A,c,B,l);A.onBeforeShadow(J,A,C,M,r,a,Q0),J.renderBufferDirect(M,null,r,a,A,Q0),A.onAfterShadow(J,A,C,M,r,a,Q0)}}}else if(S.visible){let d=y(A,S,B,l);A.onBeforeShadow(J,A,C,M,r,d,null),J.renderBufferDirect(M,null,r,d,A,null),A.onAfterShadow(J,A,C,M,r,d,null)}}}let f=A.children;for(let r=0,S=f.length;r<S;r++)V(f[r],C,M,B,l)}function I(A){A.target.removeEventListener("dispose",I);for(let M in U){let B=U[M],l=A.target.uuid;if(l in B)B[l].dispose(),delete B[l]}}}function nU(J,Q){function $(){let j=!1,H0=new HJ,s=null,Y0=new HJ(0,0,0,0);return{setMask:function(F0){if(s!==F0&&!j)J.colorMask(F0,F0,F0,F0),s=F0},setLocked:function(F0){j=F0},setClear:function(F0,t,N0,j0,QJ){if(QJ===!0)F0*=j0,t*=j0,N0*=j0;if(H0.set(F0,t,N0,j0),Y0.equals(H0)===!1)J.clearColor(F0,t,N0,j0),Y0.copy(H0)},reset:function(){j=!1,s=null,Y0.set(-1,0,0,0)}}}function W(){let j=!1,H0=!1,s=null,Y0=null,F0=null;return{setReversed:function(t){if(H0!==t){let N0=Q.get("EXT_clip_control");if(t)N0.clipControlEXT(N0.LOWER_LEFT_EXT,N0.ZERO_TO_ONE_EXT);else N0.clipControlEXT(N0.LOWER_LEFT_EXT,N0.NEGATIVE_ONE_TO_ONE_EXT);H0=t;let j0=F0;F0=null,this.setClear(j0)}},getReversed:function(){return H0},setTest:function(t){if(t)Z0(J.DEPTH_TEST);else A0(J.DEPTH_TEST)},setMask:function(t){if(s!==t&&!j)J.depthMask(t),s=t},setFunc:function(t){if(H0)t=_W[t];if(Y0!==t){switch(t){case r$:J.depthFunc(J.NEVER);break;case t$:J.depthFunc(J.ALWAYS);break;case e$:J.depthFunc(J.LESS);break;case F7:J.depthFunc(J.LEQUAL);break;case JW:J.depthFunc(J.EQUAL);break;case QW:J.depthFunc(J.GEQUAL);break;case $W:J.depthFunc(J.GREATER);break;case WW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}Y0=t}},setLocked:function(t){j=t},setClear:function(t){if(F0!==t){if(F0=t,H0)t=1-t;J.clearDepth(t)}},reset:function(){j=!1,s=null,Y0=null,F0=null,H0=!1}}}function Z(){let j=!1,H0=null,s=null,Y0=null,F0=null,t=null,N0=null,j0=null,QJ=null;return{setTest:function(s0){if(!j)if(s0)Z0(J.STENCIL_TEST);else A0(J.STENCIL_TEST)},setMask:function(s0){if(H0!==s0&&!j)J.stencilMask(s0),H0=s0},setFunc:function(s0,iJ,Z8){if(s!==s0||Y0!==iJ||F0!==Z8)J.stencilFunc(s0,iJ,Z8),s=s0,Y0=iJ,F0=Z8},setOp:function(s0,iJ,Z8){if(t!==s0||N0!==iJ||j0!==Z8)J.stencilOp(s0,iJ,Z8),t=s0,N0=iJ,j0=Z8},setLocked:function(s0){j=s0},setClear:function(s0){if(QJ!==s0)J.clearStencil(s0),QJ=s0},reset:function(){j=!1,H0=null,s=null,Y0=null,F0=null,t=null,N0=null,j0=null,QJ=null}}}let K=new $,H=new W,Y=new Z,X=new WeakMap,U=new WeakMap,E={},q={},G={},F=new WeakMap,L=[],z=null,D=!1,N=null,w=null,y=null,V=null,I=null,A=null,C=null,M=new m0(0,0,0),B=0,l=!1,v=null,f=null,r=null,S=null,d=null,o=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),m=!1,Q0=0,c=J.getParameter(J.VERSION);if(c.indexOf("WebGL")!==-1)Q0=parseFloat(/^WebGL (\d)/.exec(c)[1]),m=Q0>=1;else if(c.indexOf("OpenGL ES")!==-1)Q0=parseFloat(/^OpenGL ES (\d)/.exec(c)[1]),m=Q0>=2;let a=null,J0={},C0=J.getParameter(J.SCISSOR_BOX),z0=J.getParameter(J.VIEWPORT),JJ=new HJ().fromArray(C0),f0=new HJ().fromArray(z0);function n(j,H0,s,Y0){let F0=new Uint8Array(4),t=J.createTexture();J.bindTexture(j,t),J.texParameteri(j,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(j,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let N0=0;N0<s;N0++)if(j===J.TEXTURE_3D||j===J.TEXTURE_2D_ARRAY)J.texImage3D(H0,0,J.RGBA,1,1,Y0,0,J.RGBA,J.UNSIGNED_BYTE,F0);else J.texImage2D(H0+N0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,F0);return t}let $0={};$0[J.TEXTURE_2D]=n(J.TEXTURE_2D,J.TEXTURE_2D,1),$0[J.TEXTURE_CUBE_MAP]=n(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),$0[J.TEXTURE_2D_ARRAY]=n(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),$0[J.TEXTURE_3D]=n(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),Z0(J.DEPTH_TEST),H.setFunc(F7),RJ(!1),WJ(N7),Z0(J.CULL_FACE),o0(eJ);function Z0(j){if(E[j]!==!0)J.enable(j),E[j]=!0}function A0(j){if(E[j]!==!1)J.disable(j),E[j]=!1}function _0(j,H0){if(G[j]!==H0){if(J.bindFramebuffer(j,H0),G[j]=H0,j===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=H0;if(j===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=H0;return!0}return!1}function B0(j,H0){let s=L,Y0=!1;if(j){if(s=F.get(H0),s===void 0)s=[],F.set(H0,s);let F0=j.textures;if(s.length!==F0.length||s[0]!==J.COLOR_ATTACHMENT0){for(let t=0,N0=F0.length;t<N0;t++)s[t]=J.COLOR_ATTACHMENT0+t;s.length=F0.length,Y0=!0}}else if(s[0]!==J.BACK)s[0]=J.BACK,Y0=!0;if(Y0)J.drawBuffers(s)}function NJ(j){if(z!==j)return J.useProgram(j),z=j,!0;return!1}let b0={[N9]:J.FUNC_ADD,[j$]:J.FUNC_SUBTRACT,[y$]:J.FUNC_REVERSE_SUBTRACT};b0[v$]=J.MIN,b0[f$]=J.MAX;let l0={[h$]:J.ZERO,[b$]:J.ONE,[x$]:J.SRC_COLOR,[p$]:J.SRC_ALPHA,[n$]:J.SRC_ALPHA_SATURATE,[u$]:J.DST_COLOR,[l$]:J.DST_ALPHA,[g$]:J.ONE_MINUS_SRC_COLOR,[m$]:J.ONE_MINUS_SRC_ALPHA,[c$]:J.ONE_MINUS_DST_COLOR,[d$]:J.ONE_MINUS_DST_ALPHA,[s$]:J.CONSTANT_COLOR,[i$]:J.ONE_MINUS_CONSTANT_COLOR,[o$]:J.CONSTANT_ALPHA,[a$]:J.ONE_MINUS_CONSTANT_ALPHA};function o0(j,H0,s,Y0,F0,t,N0,j0,QJ,s0){if(j===eJ){if(D===!0)A0(J.BLEND),D=!1;return}if(D===!1)Z0(J.BLEND),D=!0;if(j!==S$){if(j!==N||s0!==l){if(w!==N9||I!==N9)J.blendEquation(J.FUNC_ADD),w=N9,I=N9;if(s0)switch(j){case w9:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case E7:J.blendFunc(J.ONE,J.ONE);break;case q7:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case D7:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:T0("WebGLState: Invalid blending: ",j);break}else switch(j){case w9:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case E7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case q7:T0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case D7:T0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:T0("WebGLState: Invalid blending: ",j);break}y=null,V=null,A=null,C=null,M.set(0,0,0),B=0,N=j,l=s0}return}if(F0=F0||H0,t=t||s,N0=N0||Y0,H0!==w||F0!==I)J.blendEquationSeparate(b0[H0],b0[F0]),w=H0,I=F0;if(s!==y||Y0!==V||t!==A||N0!==C)J.blendFuncSeparate(l0[s],l0[Y0],l0[t],l0[N0]),y=s,V=Y0,A=t,C=N0;if(j0.equals(M)===!1||QJ!==B)J.blendColor(j0.r,j0.g,j0.b,QJ),M.copy(j0),B=QJ;N=j,l=!1}function d0(j,H0){j.side===tJ?A0(J.CULL_FACE):Z0(J.CULL_FACE);let s=j.side===TJ;if(H0)s=!s;RJ(s),j.blending===w9&&j.transparent===!1?o0(eJ):o0(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),H.setFunc(j.depthFunc),H.setTest(j.depthTest),H.setMask(j.depthWrite),K.setMask(j.colorWrite);let Y0=j.stencilWrite;if(Y.setTest(Y0),Y0)Y.setMask(j.stencilWriteMask),Y.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),Y.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass);EJ(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?Z0(J.SAMPLE_ALPHA_TO_COVERAGE):A0(J.SAMPLE_ALPHA_TO_COVERAGE)}function RJ(j){if(v!==j){if(j)J.frontFace(J.CW);else J.frontFace(J.CCW);v=j}}function WJ(j){if(j!==_$){if(Z0(J.CULL_FACE),j!==f)if(j===N7)J.cullFace(J.BACK);else if(j===P$)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else A0(J.CULL_FACE);f=j}function wJ(j){if(j!==r){if(m)J.lineWidth(j);r=j}}function EJ(j,H0,s){if(j){if(Z0(J.POLYGON_OFFSET_FILL),S!==H0||d!==s){if(S=H0,d=s,H.getReversed())H0=-H0;J.polygonOffset(H0,s)}}else A0(J.POLYGON_OFFSET_FILL)}function qJ(j){if(j)Z0(J.SCISSOR_TEST);else A0(J.SCISSOR_TEST)}function P(j){if(j===void 0)j=J.TEXTURE0+o-1;if(a!==j)J.activeTexture(j),a=j}function CJ(j,H0,s){if(s===void 0)if(a===null)s=J.TEXTURE0+o-1;else s=a;let Y0=J0[s];if(Y0===void 0)Y0={type:void 0,texture:void 0},J0[s]=Y0;if(Y0.type!==j||Y0.texture!==H0){if(a!==s)J.activeTexture(s),a=s;J.bindTexture(j,H0||$0[j]),Y0.type=j,Y0.texture=H0}}function n0(){let j=J0[a];if(j!==void 0&&j.type!==void 0)J.bindTexture(j.type,null),j.type=void 0,j.texture=void 0}function YJ(){try{J.compressedTexImage2D(...arguments)}catch(j){T0("WebGLState:",j)}}function k(){try{J.compressedTexImage3D(...arguments)}catch(j){T0("WebGLState:",j)}}function O(){try{J.texSubImage2D(...arguments)}catch(j){T0("WebGLState:",j)}}function _(){try{J.texSubImage3D(...arguments)}catch(j){T0("WebGLState:",j)}}function g(){try{J.compressedTexSubImage2D(...arguments)}catch(j){T0("WebGLState:",j)}}function e(){try{J.compressedTexSubImage3D(...arguments)}catch(j){T0("WebGLState:",j)}}function K0(){try{J.texStorage2D(...arguments)}catch(j){T0("WebGLState:",j)}}function X0(){try{J.texStorage3D(...arguments)}catch(j){T0("WebGLState:",j)}}function u(){try{J.texImage2D(...arguments)}catch(j){T0("WebGLState:",j)}}function i(){try{J.texImage3D(...arguments)}catch(j){T0("WebGLState:",j)}}function D0(j){if(q[j]!==void 0)return q[j];else return J.getParameter(j)}function V0(j,H0){if(q[j]!==H0)J.pixelStorei(j,H0),q[j]=H0}function U0(j){if(JJ.equals(j)===!1)J.scissor(j.x,j.y,j.z,j.w),JJ.copy(j)}function W0(j){if(f0.equals(j)===!1)J.viewport(j.x,j.y,j.z,j.w),f0.copy(j)}function I0(j,H0){let s=U.get(H0);if(s===void 0)s=new WeakMap,U.set(H0,s);let Y0=s.get(j);if(Y0===void 0)Y0=J.getUniformBlockIndex(H0,j.name),s.set(j,Y0)}function w0(j,H0){let Y0=U.get(H0).get(j);if(X.get(H0)!==Y0)J.uniformBlockBinding(H0,Y0,j.__bindingPointIndex),X.set(H0,Y0)}function c0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),E={},q={},a=null,J0={},G={},F=new WeakMap,L=[],z=null,D=!1,N=null,w=null,y=null,V=null,I=null,A=null,C=null,M=new m0(0,0,0),B=0,l=!1,v=null,f=null,r=null,S=null,d=null,JJ.set(0,0,J.canvas.width,J.canvas.height),f0.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:Z0,disable:A0,bindFramebuffer:_0,drawBuffers:B0,useProgram:NJ,setBlending:o0,setMaterial:d0,setFlipSided:RJ,setCullFace:WJ,setLineWidth:wJ,setPolygonOffset:EJ,setScissorTest:qJ,activeTexture:P,bindTexture:CJ,unbindTexture:n0,compressedTexImage2D:YJ,compressedTexImage3D:k,texImage2D:u,texImage3D:i,pixelStorei:V0,getParameter:D0,updateUBOMapping:I0,uniformBlockBinding:w0,texStorage2D:K0,texStorage3D:X0,texSubImage2D:O,texSubImage3D:_,compressedTexSubImage2D:g,compressedTexSubImage3D:e,scissor:U0,viewport:W0,reset:c0}}function sU(J,Q,$,W,Z,K,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new p0,E=new WeakMap,q=new Set,G,F=new WeakMap,L=!1;try{L=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(k){}function z(k,O){return L?new OffscreenCanvas(k,O):z9("canvas")}function D(k,O,_){let g=1,e=YJ(k);if(e.width>_||e.height>_)g=_/Math.max(e.width,e.height);if(g<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){let K0=Math.floor(g*e.width),X0=Math.floor(g*e.height);if(G===void 0)G=z(K0,X0);let u=O?z(K0,X0):G;return u.width=K0,u.height=X0,u.getContext("2d").drawImage(k,0,0,K0,X0),P0("WebGLRenderer: Texture has been resized from ("+e.width+"x"+e.height+") to ("+K0+"x"+X0+")."),u}else{if("data"in k)P0("WebGLRenderer: Image in DataTexture is too big ("+e.width+"x"+e.height+").");return k}return k}function N(k){return k.generateMipmaps}function w(k){J.generateMipmap(k)}function y(k){if(k.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(k.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function V(k,O,_,g,e,K0=!1){if(k!==null){if(J[k]!==void 0)return J[k];P0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let X0;if(g){if(X0=Q.get("EXT_texture_norm16"),!X0)P0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let u=O;if(O===J.RED){if(_===J.FLOAT)u=J.R32F;if(_===J.HALF_FLOAT)u=J.R16F;if(_===J.UNSIGNED_BYTE)u=J.R8;if(_===J.UNSIGNED_SHORT&&X0)u=X0.R16_EXT;if(_===J.SHORT&&X0)u=X0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(_===J.UNSIGNED_BYTE)u=J.R8UI;if(_===J.UNSIGNED_SHORT)u=J.R16UI;if(_===J.UNSIGNED_INT)u=J.R32UI;if(_===J.BYTE)u=J.R8I;if(_===J.SHORT)u=J.R16I;if(_===J.INT)u=J.R32I}if(O===J.RG){if(_===J.FLOAT)u=J.RG32F;if(_===J.HALF_FLOAT)u=J.RG16F;if(_===J.UNSIGNED_BYTE)u=J.RG8;if(_===J.UNSIGNED_SHORT&&X0)u=X0.RG16_EXT;if(_===J.SHORT&&X0)u=X0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(_===J.UNSIGNED_BYTE)u=J.RG8UI;if(_===J.UNSIGNED_SHORT)u=J.RG16UI;if(_===J.UNSIGNED_INT)u=J.RG32UI;if(_===J.BYTE)u=J.RG8I;if(_===J.SHORT)u=J.RG16I;if(_===J.INT)u=J.RG32I}if(O===J.RGB_INTEGER){if(_===J.UNSIGNED_BYTE)u=J.RGB8UI;if(_===J.UNSIGNED_SHORT)u=J.RGB16UI;if(_===J.UNSIGNED_INT)u=J.RGB32UI;if(_===J.BYTE)u=J.RGB8I;if(_===J.SHORT)u=J.RGB16I;if(_===J.INT)u=J.RGB32I}if(O===J.RGBA_INTEGER){if(_===J.UNSIGNED_BYTE)u=J.RGBA8UI;if(_===J.UNSIGNED_SHORT)u=J.RGBA16UI;if(_===J.UNSIGNED_INT)u=J.RGBA32UI;if(_===J.BYTE)u=J.RGBA8I;if(_===J.SHORT)u=J.RGBA16I;if(_===J.INT)u=J.RGBA32I}if(O===J.RGB){if(_===J.UNSIGNED_SHORT&&X0)u=X0.RGB16_EXT;if(_===J.SHORT&&X0)u=X0.RGB16_SNORM_EXT;if(_===J.UNSIGNED_INT_5_9_9_9_REV)u=J.RGB9_E5;if(_===J.UNSIGNED_INT_10F_11F_11F_REV)u=J.R11F_G11F_B10F}if(O===J.RGBA){let i=K0?YQ:x0.getTransfer(e);if(_===J.FLOAT)u=J.RGBA32F;if(_===J.HALF_FLOAT)u=J.RGBA16F;if(_===J.UNSIGNED_BYTE)u=i===e0?J.SRGB8_ALPHA8:J.RGBA8;if(_===J.UNSIGNED_SHORT&&X0)u=X0.RGBA16_EXT;if(_===J.SHORT&&X0)u=X0.RGBA16_SNORM_EXT;if(_===J.UNSIGNED_SHORT_4_4_4_4)u=J.RGBA4;if(_===J.UNSIGNED_SHORT_5_5_5_1)u=J.RGB5_A1}if(u===J.R16F||u===J.R32F||u===J.RG16F||u===J.RG32F||u===J.RGBA16F||u===J.RGBA32F)Q.get("EXT_color_buffer_float");return u}function I(k,O){let _;if(k){if(O===null||O===A8||O===q9)_=J.DEPTH24_STENCIL8;else if(O===E8)_=J.DEPTH32F_STENCIL8;else if(O===P9)_=J.DEPTH24_STENCIL8,P0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===A8||O===q9)_=J.DEPTH_COMPONENT24;else if(O===E8)_=J.DEPTH_COMPONENT32F;else if(O===P9)_=J.DEPTH_COMPONENT16;return _}function A(k,O){if(N(k)===!0||k.isFramebufferTexture&&k.minFilter!==z8&&k.minFilter!==SJ)return Math.log2(Math.max(O.width,O.height))+1;else if(k.mipmaps!==void 0&&k.mipmaps.length>0)return k.mipmaps.length;else if(k.isCompressedTexture&&Array.isArray(k.image))return O.mipmaps.length;else return 1}function C(k){let O=k.target;if(O.removeEventListener("dispose",C),B(O),O.isVideoTexture)E.delete(O);if(O.isHTMLTexture)q.delete(O)}function M(k){let O=k.target;O.removeEventListener("dispose",M),v(O)}function B(k){let O=W.get(k);if(O.__webglInit===void 0)return;let _=k.source,g=F.get(_);if(g){let e=g[O.__cacheKey];if(e.usedTimes--,e.usedTimes===0)l(k);if(Object.keys(g).length===0)F.delete(_)}W.remove(k)}function l(k){let O=W.get(k);J.deleteTexture(O.__webglTexture);let _=k.source,g=F.get(_);delete g[O.__cacheKey],H.memory.textures--}function v(k){let O=W.get(k);if(k.depthTexture)k.depthTexture.dispose(),W.remove(k.depthTexture);if(k.isWebGLCubeRenderTarget)for(let g=0;g<6;g++){if(Array.isArray(O.__webglFramebuffer[g]))for(let e=0;e<O.__webglFramebuffer[g].length;e++)J.deleteFramebuffer(O.__webglFramebuffer[g][e]);else J.deleteFramebuffer(O.__webglFramebuffer[g]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[g])}else{if(Array.isArray(O.__webglFramebuffer))for(let g=0;g<O.__webglFramebuffer.length;g++)J.deleteFramebuffer(O.__webglFramebuffer[g]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let g=0;g<O.__webglColorRenderbuffer.length;g++)if(O.__webglColorRenderbuffer[g])J.deleteRenderbuffer(O.__webglColorRenderbuffer[g])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let _=k.textures;for(let g=0,e=_.length;g<e;g++){let K0=W.get(_[g]);if(K0.__webglTexture)J.deleteTexture(K0.__webglTexture),H.memory.textures--;W.remove(_[g])}W.remove(k)}let f=0;function r(){f=0}function S(){return f}function d(k){f=k}function o(){let k=f;if(k>=Z.maxTextures)P0("WebGLTextures: Trying to use "+(k+1)+" texture units while this GPU supports only "+Z.maxTextures);return f+=1,k}function m(k){let O=[];return O.push(k.wrapS),O.push(k.wrapT),O.push(k.wrapR||0),O.push(k.magFilter),O.push(k.minFilter),O.push(k.anisotropy),O.push(k.internalFormat),O.push(k.format),O.push(k.type),O.push(k.generateMipmaps),O.push(k.premultiplyAlpha),O.push(k.flipY),O.push(k.unpackAlignment),O.push(k.colorSpace),O.join()}function Q0(k,O){let _=W.get(k);if(k.isVideoTexture)CJ(k);if(k.isRenderTargetTexture===!1&&k.isExternalTexture!==!0&&k.version>0&&_.__version!==k.version){let g=k.image;if(g===null)P0("WebGLRenderer: Texture marked for update but no image data found.");else if(g.complete===!1)P0("WebGLRenderer: Texture marked for update but image is incomplete");else{A0(_,k,O);return}}else if(k.isExternalTexture)_.__webglTexture=k.sourceTexture?k.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,_.__webglTexture,J.TEXTURE0+O)}function c(k,O){let _=W.get(k);if(k.isRenderTargetTexture===!1&&k.version>0&&_.__version!==k.version){A0(_,k,O);return}else if(k.isExternalTexture)_.__webglTexture=k.sourceTexture?k.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,_.__webglTexture,J.TEXTURE0+O)}function a(k,O){let _=W.get(k);if(k.isRenderTargetTexture===!1&&k.version>0&&_.__version!==k.version){A0(_,k,O);return}$.bindTexture(J.TEXTURE_3D,_.__webglTexture,J.TEXTURE0+O)}function J0(k,O){let _=W.get(k);if(k.isCubeDepthTexture!==!0&&k.version>0&&_.__version!==k.version){_0(_,k,O);return}$.bindTexture(J.TEXTURE_CUBE_MAP,_.__webglTexture,J.TEXTURE0+O)}let C0={[YW]:J.REPEAT,[N6]:J.CLAMP_TO_EDGE,[XW]:J.MIRRORED_REPEAT},z0={[z8]:J.NEAREST,[UW]:J.NEAREST_MIPMAP_NEAREST,[_9]:J.NEAREST_MIPMAP_LINEAR,[SJ]:J.LINEAR,[E6]:J.LINEAR_MIPMAP_NEAREST,[y8]:J.LINEAR_MIPMAP_LINEAR},JJ={[kW]:J.NEVER,[zW]:J.ALWAYS,[LW]:J.LESS,[k6]:J.LEQUAL,[VW]:J.EQUAL,[L6]:J.GEQUAL,[BW]:J.GREATER,[IW]:J.NOTEQUAL};function f0(k,O){if(O.type===E8&&Q.has("OES_texture_float_linear")===!1&&(O.magFilter===SJ||O.magFilter===E6||O.magFilter===_9||O.magFilter===y8||O.minFilter===SJ||O.minFilter===E6||O.minFilter===_9||O.minFilter===y8))P0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(k,J.TEXTURE_WRAP_S,C0[O.wrapS]),J.texParameteri(k,J.TEXTURE_WRAP_T,C0[O.wrapT]),k===J.TEXTURE_3D||k===J.TEXTURE_2D_ARRAY)J.texParameteri(k,J.TEXTURE_WRAP_R,C0[O.wrapR]);if(J.texParameteri(k,J.TEXTURE_MAG_FILTER,z0[O.magFilter]),J.texParameteri(k,J.TEXTURE_MIN_FILTER,z0[O.minFilter]),O.compareFunction)J.texParameteri(k,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(k,J.TEXTURE_COMPARE_FUNC,JJ[O.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===z8)return;if(O.minFilter!==_9&&O.minFilter!==y8)return;if(O.type===E8&&Q.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||W.get(O).__currentAnisotropy){let _=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(k,_.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,Z.getMaxAnisotropy())),W.get(O).__currentAnisotropy=O.anisotropy}}}function n(k,O){let _=!1;if(k.__webglInit===void 0)k.__webglInit=!0,O.addEventListener("dispose",C);let g=O.source,e=F.get(g);if(e===void 0)e={},F.set(g,e);let K0=m(O);if(K0!==k.__cacheKey){if(e[K0]===void 0)e[K0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,_=!0;e[K0].usedTimes++;let X0=e[k.__cacheKey];if(X0!==void 0){if(e[k.__cacheKey].usedTimes--,X0.usedTimes===0)l(O)}k.__cacheKey=K0,k.__webglTexture=e[K0].texture}return _}function $0(k,O,_){return Math.floor(Math.floor(k/_)/O)}function Z0(k,O,_,g){let K0=k.updateRanges;if(K0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,_,g,O.data);else{K0.sort((V0,U0)=>V0.start-U0.start);let X0=0;for(let V0=1;V0<K0.length;V0++){let U0=K0[X0],W0=K0[V0],I0=U0.start+U0.count,w0=$0(W0.start,O.width,4),c0=$0(U0.start,O.width,4);if(W0.start<=I0+1&&w0===c0&&$0(W0.start+W0.count-1,O.width,4)===w0)U0.count=Math.max(U0.count,W0.start+W0.count-U0.start);else++X0,K0[X0]=W0}K0.length=X0+1;let u=$.getParameter(J.UNPACK_ROW_LENGTH),i=$.getParameter(J.UNPACK_SKIP_PIXELS),D0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let V0=0,U0=K0.length;V0<U0;V0++){let W0=K0[V0],I0=Math.floor(W0.start/4),w0=Math.ceil(W0.count/4),c0=I0%O.width,j=Math.floor(I0/O.width),H0=w0,s=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,c0),$.pixelStorei(J.UNPACK_SKIP_ROWS,j),$.texSubImage2D(J.TEXTURE_2D,0,c0,j,H0,1,_,g,O.data)}k.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,u),$.pixelStorei(J.UNPACK_SKIP_PIXELS,i),$.pixelStorei(J.UNPACK_SKIP_ROWS,D0)}}function A0(k,O,_){let g=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)g=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)g=J.TEXTURE_3D;let e=n(k,O),K0=O.source;$.bindTexture(g,k.__webglTexture,J.TEXTURE0+_);let X0=W.get(K0);if(K0.version!==X0.__version||e===!0){if($.activeTexture(J.TEXTURE0+_),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let s=x0.getPrimaries(x0.workingColorSpace),Y0=O.colorSpace===b8?null:x0.getPrimaries(O.colorSpace),F0=O.colorSpace===b8||s===Y0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,F0)}$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let i=D(O.image,!1,Z.maxTextureSize);i=n0(O,i);let D0=K.convert(O.format,O.colorSpace),V0=K.convert(O.type),U0=V(O.internalFormat,D0,V0,O.normalized,O.colorSpace,O.isVideoTexture);f0(g,O);let W0,I0=O.mipmaps,w0=O.isVideoTexture!==!0,c0=X0.__version===void 0||e===!0,j=K0.dataReady,H0=A(O,i);if(O.isDepthTexture){if(U0=I(O.format===f8,O.type),c0)if(w0)$.texStorage2D(J.TEXTURE_2D,1,U0,i.width,i.height);else $.texImage2D(J.TEXTURE_2D,0,U0,i.width,i.height,0,D0,V0,null)}else if(O.isDataTexture)if(I0.length>0){if(w0&&c0)$.texStorage2D(J.TEXTURE_2D,H0,U0,I0[0].width,I0[0].height);for(let s=0,Y0=I0.length;s<Y0;s++)if(W0=I0[s],w0){if(j)$.texSubImage2D(J.TEXTURE_2D,s,0,0,W0.width,W0.height,D0,V0,W0.data)}else $.texImage2D(J.TEXTURE_2D,s,U0,W0.width,W0.height,0,D0,V0,W0.data);O.generateMipmaps=!1}else if(w0){if(c0)$.texStorage2D(J.TEXTURE_2D,H0,U0,i.width,i.height);if(j)Z0(O,i,D0,V0)}else $.texImage2D(J.TEXTURE_2D,0,U0,i.width,i.height,0,D0,V0,i.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(w0&&c0)$.texStorage3D(J.TEXTURE_2D_ARRAY,H0,U0,I0[0].width,I0[0].height,i.depth);for(let s=0,Y0=I0.length;s<Y0;s++)if(W0=I0[s],O.format!==Q8)if(D0!==null)if(w0){if(j)if(O.layerUpdates.size>0){let F0=bQ(W0.width,W0.height,O.format,O.type);for(let t of O.layerUpdates){let N0=W0.data.subarray(t*F0/W0.data.BYTES_PER_ELEMENT,(t+1)*F0/W0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,t,W0.width,W0.height,1,D0,N0)}}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,W0.width,W0.height,i.depth,D0,W0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,s,U0,W0.width,W0.height,i.depth,0,W0.data,0,0);else P0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(w0){if(j)$.texSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,W0.width,W0.height,i.depth,D0,V0,W0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,s,U0,W0.width,W0.height,i.depth,0,D0,V0,W0.data);if(O.layerUpdates.size>0)O.clearLayerUpdates()}else{if(w0&&c0)$.texStorage2D(J.TEXTURE_2D,H0,U0,I0[0].width,I0[0].height);for(let s=0,Y0=I0.length;s<Y0;s++)if(W0=I0[s],O.format!==Q8)if(D0!==null)if(w0){if(j)$.compressedTexSubImage2D(J.TEXTURE_2D,s,0,0,W0.width,W0.height,D0,W0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,s,U0,W0.width,W0.height,0,W0.data);else P0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(w0){if(j)$.texSubImage2D(J.TEXTURE_2D,s,0,0,W0.width,W0.height,D0,V0,W0.data)}else $.texImage2D(J.TEXTURE_2D,s,U0,W0.width,W0.height,0,D0,V0,W0.data)}else if(O.isDataArrayTexture)if(w0){if(c0)$.texStorage3D(J.TEXTURE_2D_ARRAY,H0,U0,i.width,i.height,i.depth);if(j)if(O.layerUpdates.size>0){let s=bQ(i.width,i.height,O.format,O.type);for(let Y0 of O.layerUpdates){let F0=i.data.subarray(Y0*s/i.data.BYTES_PER_ELEMENT,(Y0+1)*s/i.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,Y0,i.width,i.height,1,D0,V0,F0)}O.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,i.width,i.height,i.depth,D0,V0,i.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,U0,i.width,i.height,i.depth,0,D0,V0,i.data);else if(O.isData3DTexture)if(w0){if(c0)$.texStorage3D(J.TEXTURE_3D,H0,U0,i.width,i.height,i.depth);if(j)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,i.width,i.height,i.depth,D0,V0,i.data)}else $.texImage3D(J.TEXTURE_3D,0,U0,i.width,i.height,i.depth,0,D0,V0,i.data);else if(O.isFramebufferTexture){if(c0)if(w0)$.texStorage2D(J.TEXTURE_2D,H0,U0,i.width,i.height);else{let{width:s,height:Y0}=i;for(let F0=0;F0<H0;F0++)$.texImage2D(J.TEXTURE_2D,F0,U0,s,Y0,0,D0,V0,null),s>>=1,Y0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let s=J.canvas;if(!s.hasAttribute("layoutsubtree"))s.setAttribute("layoutsubtree","true");if(i.parentNode!==s){s.appendChild(i),q.add(O),s.onpaint=(Y0)=>{let F0=Y0.changedElements;for(let t of q)if(F0.includes(t.image))t.needsUpdate=!0},s.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,i);else{let{RGBA:F0,RGBA:t,UNSIGNED_BYTE:N0}=J;J.texElementImage2D(J.TEXTURE_2D,0,F0,t,N0,i)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(I0.length>0){if(w0&&c0){let s=YJ(I0[0]);$.texStorage2D(J.TEXTURE_2D,H0,U0,s.width,s.height)}for(let s=0,Y0=I0.length;s<Y0;s++)if(W0=I0[s],w0){if(j)$.texSubImage2D(J.TEXTURE_2D,s,0,0,D0,V0,W0)}else $.texImage2D(J.TEXTURE_2D,s,U0,D0,V0,W0);O.generateMipmaps=!1}else if(w0){if(c0){let s=YJ(i);$.texStorage2D(J.TEXTURE_2D,H0,U0,s.width,s.height)}if(j)$.texSubImage2D(J.TEXTURE_2D,0,0,0,D0,V0,i)}else $.texImage2D(J.TEXTURE_2D,0,U0,D0,V0,i);if(N(O))w(g);if(X0.__version=K0.version,O.onUpdate)O.onUpdate(O)}k.__version=O.version}function _0(k,O,_){if(O.image.length!==6)return;let g=n(k,O),e=O.source;$.bindTexture(J.TEXTURE_CUBE_MAP,k.__webglTexture,J.TEXTURE0+_);let K0=W.get(e);if(e.version!==K0.__version||g===!0){$.activeTexture(J.TEXTURE0+_);let X0=x0.getPrimaries(x0.workingColorSpace),u=O.colorSpace===b8?null:x0.getPrimaries(O.colorSpace),i=O.colorSpace===b8||X0===u?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,i);let D0=O.isCompressedTexture||O.image[0].isCompressedTexture,V0=O.image[0]&&O.image[0].isDataTexture,U0=[];for(let t=0;t<6;t++){if(!D0&&!V0)U0[t]=D(O.image[t],!0,Z.maxCubemapSize);else U0[t]=V0?O.image[t].image:O.image[t];U0[t]=n0(O,U0[t])}let W0=U0[0],I0=K.convert(O.format,O.colorSpace),w0=K.convert(O.type),c0=V(O.internalFormat,I0,w0,O.normalized,O.colorSpace),j=O.isVideoTexture!==!0,H0=K0.__version===void 0||g===!0,s=e.dataReady,Y0=A(O,W0);f0(J.TEXTURE_CUBE_MAP,O);let F0;if(D0){if(j&&H0)$.texStorage2D(J.TEXTURE_CUBE_MAP,Y0,c0,W0.width,W0.height);for(let t=0;t<6;t++){F0=U0[t].mipmaps;for(let N0=0;N0<F0.length;N0++){let j0=F0[N0];if(O.format!==Q8)if(I0!==null)if(j){if(s)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,N0,0,0,j0.width,j0.height,I0,j0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,N0,c0,j0.width,j0.height,0,j0.data);else P0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(j){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,N0,0,0,j0.width,j0.height,I0,w0,j0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,N0,c0,j0.width,j0.height,0,I0,w0,j0.data)}}}else{if(F0=O.mipmaps,j&&H0){if(F0.length>0)Y0++;let t=YJ(U0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,Y0,c0,t.width,t.height)}for(let t=0;t<6;t++)if(V0){if(j){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,U0[t].width,U0[t].height,I0,w0,U0[t].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,c0,U0[t].width,U0[t].height,0,I0,w0,U0[t].data);for(let N0=0;N0<F0.length;N0++){let QJ=F0[N0].image[t].image;if(j){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,N0+1,0,0,QJ.width,QJ.height,I0,w0,QJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,N0+1,c0,QJ.width,QJ.height,0,I0,w0,QJ.data)}}else{if(j){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,I0,w0,U0[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,c0,I0,w0,U0[t]);for(let N0=0;N0<F0.length;N0++){let j0=F0[N0];if(j){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,N0+1,0,0,I0,w0,j0.image[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,N0+1,c0,I0,w0,j0.image[t])}}}if(N(O))w(J.TEXTURE_CUBE_MAP);if(K0.__version=e.version,O.onUpdate)O.onUpdate(O)}k.__version=O.version}function B0(k,O,_,g,e,K0){let X0=K.convert(_.format,_.colorSpace),u=K.convert(_.type),i=V(_.internalFormat,X0,u,_.normalized,_.colorSpace),D0=W.get(O),V0=W.get(_);if(V0.__renderTarget=O,!D0.__hasExternalTextures){let U0=Math.max(1,O.width>>K0),W0=Math.max(1,O.height>>K0);if(e===J.TEXTURE_3D||e===J.TEXTURE_2D_ARRAY)$.texImage3D(e,K0,i,U0,W0,O.depth,0,X0,u,null);else $.texImage2D(e,K0,i,U0,W0,0,X0,u,null)}if($.bindFramebuffer(J.FRAMEBUFFER,k),P(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,g,e,V0.__webglTexture,0,qJ(O));else if(e===J.TEXTURE_2D||e>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&e<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,g,e,V0.__webglTexture,K0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function NJ(k,O,_){if(J.bindRenderbuffer(J.RENDERBUFFER,k),O.depthBuffer){let g=O.depthTexture,e=g&&g.isDepthTexture?g.type:null,K0=I(O.stencilBuffer,e),X0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(P(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,qJ(O),K0,O.width,O.height);else if(_)J.renderbufferStorageMultisample(J.RENDERBUFFER,qJ(O),K0,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,K0,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,X0,J.RENDERBUFFER,k)}else{let g=O.textures;for(let e=0;e<g.length;e++){let K0=g[e],X0=K.convert(K0.format,K0.colorSpace),u=K.convert(K0.type),i=V(K0.internalFormat,X0,u,K0.normalized,K0.colorSpace);if(P(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,qJ(O),i,O.width,O.height);else if(_)J.renderbufferStorageMultisample(J.RENDERBUFFER,qJ(O),i,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,i,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function b0(k,O,_){let g=O.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,k),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let e=W.get(O.depthTexture);if(e.__renderTarget=O,!e.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(g){if(e.__webglInit===void 0)e.__webglInit=!0,O.depthTexture.addEventListener("dispose",C);if(e.__webglTexture===void 0){e.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,e.__webglTexture),f0(J.TEXTURE_CUBE_MAP,O.depthTexture);let D0=K.convert(O.depthTexture.format),V0=K.convert(O.depthTexture.type),U0;if(O.depthTexture.format===v8)U0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===f8)U0=J.DEPTH24_STENCIL8;for(let W0=0;W0<6;W0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+W0,0,U0,O.width,O.height,0,D0,V0,null)}}else Q0(O.depthTexture,0);let K0=e.__webglTexture,X0=qJ(O),u=g?J.TEXTURE_CUBE_MAP_POSITIVE_X+_:J.TEXTURE_2D,i=O.depthTexture.format===f8?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===v8)if(P(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,K0,0,X0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,K0,0);else if(O.depthTexture.format===f8)if(P(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,K0,0,X0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,K0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function l0(k){let O=W.get(k),_=k.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==k.depthTexture){let g=k.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(g){let e=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,g.removeEventListener("dispose",e)};g.addEventListener("dispose",e),O.__depthDisposeCallback=e}O.__boundDepthTexture=g}if(k.depthTexture&&!O.__autoAllocateDepthBuffer)if(_)for(let g=0;g<6;g++)b0(O.__webglFramebuffer[g],k,g);else{let g=k.texture.mipmaps;if(g&&g.length>0)b0(O.__webglFramebuffer[0],k,0);else b0(O.__webglFramebuffer,k,0)}else if(_){O.__webglDepthbuffer=[];for(let g=0;g<6;g++)if($.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[g]),O.__webglDepthbuffer[g]===void 0)O.__webglDepthbuffer[g]=J.createRenderbuffer(),NJ(O.__webglDepthbuffer[g],k,!1);else{let e=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,K0=O.__webglDepthbuffer[g];J.bindRenderbuffer(J.RENDERBUFFER,K0),J.framebufferRenderbuffer(J.FRAMEBUFFER,e,J.RENDERBUFFER,K0)}}else{let g=k.texture.mipmaps;if(g&&g.length>0)$.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),NJ(O.__webglDepthbuffer,k,!1);else{let e=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,K0=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,K0),J.framebufferRenderbuffer(J.FRAMEBUFFER,e,J.RENDERBUFFER,K0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function o0(k,O,_){let g=W.get(k);if(O!==void 0)B0(g.__webglFramebuffer,k,k.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(_!==void 0)l0(k)}function d0(k){let O=k.texture,_=W.get(k),g=W.get(O);k.addEventListener("dispose",M);let e=k.textures,K0=k.isWebGLCubeRenderTarget===!0,X0=e.length>1;if(!X0){if(g.__webglTexture===void 0)g.__webglTexture=J.createTexture();g.__version=O.version,H.memory.textures++}if(K0){_.__webglFramebuffer=[];for(let u=0;u<6;u++)if(O.mipmaps&&O.mipmaps.length>0){_.__webglFramebuffer[u]=[];for(let i=0;i<O.mipmaps.length;i++)_.__webglFramebuffer[u][i]=J.createFramebuffer()}else _.__webglFramebuffer[u]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){_.__webglFramebuffer=[];for(let u=0;u<O.mipmaps.length;u++)_.__webglFramebuffer[u]=J.createFramebuffer()}else _.__webglFramebuffer=J.createFramebuffer();if(X0)for(let u=0,i=e.length;u<i;u++){let D0=W.get(e[u]);if(D0.__webglTexture===void 0)D0.__webglTexture=J.createTexture(),H.memory.textures++}if(k.samples>0&&P(k)===!1){_.__webglMultisampledFramebuffer=J.createFramebuffer(),_.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,_.__webglMultisampledFramebuffer);for(let u=0;u<e.length;u++){let i=e[u];_.__webglColorRenderbuffer[u]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,_.__webglColorRenderbuffer[u]);let D0=K.convert(i.format,i.colorSpace),V0=K.convert(i.type),U0=V(i.internalFormat,D0,V0,i.normalized,i.colorSpace,k.isXRRenderTarget===!0),W0=qJ(k);J.renderbufferStorageMultisample(J.RENDERBUFFER,W0,U0,k.width,k.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+u,J.RENDERBUFFER,_.__webglColorRenderbuffer[u])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),k.depthBuffer)_.__webglDepthRenderbuffer=J.createRenderbuffer(),NJ(_.__webglDepthRenderbuffer,k,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(K0){$.bindTexture(J.TEXTURE_CUBE_MAP,g.__webglTexture),f0(J.TEXTURE_CUBE_MAP,O);for(let u=0;u<6;u++)if(O.mipmaps&&O.mipmaps.length>0)for(let i=0;i<O.mipmaps.length;i++)B0(_.__webglFramebuffer[u][i],k,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,i);else B0(_.__webglFramebuffer[u],k,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,0);if(N(O))w(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(X0){for(let u=0,i=e.length;u<i;u++){let D0=e[u],V0=W.get(D0),U0=J.TEXTURE_2D;if(k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)U0=k.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(U0,V0.__webglTexture),f0(U0,D0),B0(_.__webglFramebuffer,k,D0,J.COLOR_ATTACHMENT0+u,U0,0),N(D0))w(U0)}$.unbindTexture()}else{let u=J.TEXTURE_2D;if(k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)u=k.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(u,g.__webglTexture),f0(u,O),O.mipmaps&&O.mipmaps.length>0)for(let i=0;i<O.mipmaps.length;i++)B0(_.__webglFramebuffer[i],k,O,J.COLOR_ATTACHMENT0,u,i);else B0(_.__webglFramebuffer,k,O,J.COLOR_ATTACHMENT0,u,0);if(N(O))w(u);$.unbindTexture()}if(k.depthBuffer)l0(k)}function RJ(k){let O=k.textures;for(let _=0,g=O.length;_<g;_++){let e=O[_];if(N(e)){let K0=y(k),X0=W.get(e).__webglTexture;$.bindTexture(K0,X0),w(K0),$.unbindTexture()}}}let WJ=[],wJ=[];function EJ(k){if(k.samples>0){if(P(k)===!1){let{textures:O,width:_,height:g}=k,e=J.COLOR_BUFFER_BIT,K0=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,X0=W.get(k),u=O.length>1;if(u)for(let D0=0;D0<O.length;D0++)$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+D0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+D0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,X0.__webglMultisampledFramebuffer);let i=k.texture.mipmaps;if(i&&i.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglFramebuffer);for(let D0=0;D0<O.length;D0++){if(k.resolveDepthBuffer){if(k.depthBuffer)e|=J.DEPTH_BUFFER_BIT;if(k.stencilBuffer&&k.resolveStencilBuffer)e|=J.STENCIL_BUFFER_BIT}if(u){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,X0.__webglColorRenderbuffer[D0]);let V0=W.get(O[D0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,V0,0)}if(J.blitFramebuffer(0,0,_,g,0,0,_,g,e,J.NEAREST),X===!0){if(WJ.length=0,wJ.length=0,WJ.push(J.COLOR_ATTACHMENT0+D0),k.depthBuffer&&k.storeMultisampledDepthBuffer===!1)WJ.push(K0),wJ.push(K0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,wJ);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,WJ)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),u)for(let D0=0;D0<O.length;D0++){$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+D0,J.RENDERBUFFER,X0.__webglColorRenderbuffer[D0]);let V0=W.get(O[D0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,X0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+D0,J.TEXTURE_2D,V0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,X0.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.storeMultisampledDepthBuffer===!1&&X){let O=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function qJ(k){return Math.min(Z.maxSamples,k.samples)}function P(k){let O=W.get(k);return k.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function CJ(k){let O=H.render.frame;if(E.get(k)!==O)E.set(k,O),k.update()}function n0(k,O){let{colorSpace:_,format:g,type:e}=k;if(k.isCompressedTexture===!0||k.isVideoTexture===!0)return O;if(_!==HQ&&_!==b8)if(x0.getTransfer(_)===e0){if(g!==Q8||e!==nJ)P0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else T0("WebGLTextures: Unsupported texture color space:",_);return O}function YJ(k){if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement)U.width=k.naturalWidth||k.width,U.height=k.naturalHeight||k.height;else if(typeof VideoFrame<"u"&&k instanceof VideoFrame)U.width=k.displayWidth,U.height=k.displayHeight;else U.width=k.width,U.height=k.height;return U}this.allocateTextureUnit=o,this.resetTextureUnits=r,this.getTextureUnits=S,this.setTextureUnits=d,this.setTexture2D=Q0,this.setTexture2DArray=c,this.setTexture3D=a,this.setTextureCube=J0,this.rebindTextures=o0,this.setupRenderTarget=d0,this.updateRenderTargetMipmap=RJ,this.updateMultisampleRenderTarget=EJ,this.setupDepthRenderbuffer=l0,this.setupFrameBufferTexture=B0,this.useMultisampledRTT=P,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function iU(J,Q){function $(W,Z=b8){let K,H=x0.getTransfer(Z);if(W===nJ)return J.UNSIGNED_BYTE;if(W===z7)return J.UNSIGNED_SHORT_4_4_4_4;if(W===A7)return J.UNSIGNED_SHORT_5_5_5_1;if(W===EW)return J.UNSIGNED_INT_5_9_9_9_REV;if(W===qW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(W===GW)return J.BYTE;if(W===NW)return J.SHORT;if(W===P9)return J.UNSIGNED_SHORT;if(W===I7)return J.INT;if(W===A8)return J.UNSIGNED_INT;if(W===E8)return J.FLOAT;if(W===J8)return J.HALF_FLOAT;if(W===DW)return J.ALPHA;if(W===FW)return J.RGB;if(W===Q8)return J.RGBA;if(W===v8)return J.DEPTH_COMPONENT;if(W===f8)return J.DEPTH_STENCIL;if(W===OW)return J.RED;if(W===w7)return J.RED_INTEGER;if(W===h8)return J.RG;if(W===C7)return J.RG_INTEGER;if(W===_7)return J.RGBA_INTEGER;if(W===q6||W===D6||W===F6||W===O6)if(H===e0)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(W===q6)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===D6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===F6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===O6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(W===q6)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===D6)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===F6)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===O6)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===P7||W===T7||W===S7||W===j7)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(W===P7)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===T7)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===S7)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===j7)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===y7||W===v7||W===f7||W===h7||W===b7||W===R6||W===x7)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(W===y7||W===v7)return H===e0?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(W===f7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(W===h7)return K.COMPRESSED_R11_EAC;if(W===b7)return K.COMPRESSED_SIGNED_R11_EAC;if(W===R6)return K.COMPRESSED_RG11_EAC;if(W===x7)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(W===g7||W===p7||W===m7||W===l7||W===d7||W===u7||W===c7||W===n7||W===s7||W===i7||W===o7||W===a7||W===r7||W===t7)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(W===g7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===p7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===m7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===l7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===d7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===u7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===c7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===n7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===s7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===i7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===o7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===a7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===r7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===t7)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===e7||W===JQ||W===QQ)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(W===e7)return H===e0?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===JQ)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===QQ)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===$Q||W===WQ||W===M6||W===ZQ)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(W===$Q)return K.COMPRESSED_RED_RGTC1_EXT;if(W===WQ)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===M6)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===ZQ)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===q9)return J.UNSIGNED_INT_24_8;return J[W]!==void 0?J[W]:null}return{convert:$}}var oU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aU=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qZ{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new _6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new gJ({vertexShader:oU,fragmentShader:aU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new jJ(new f9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class DZ extends q8{constructor(J,Q){super();let $=this,W=null,Z=1,K=null,H="local-floor",Y=1,X=null,U=null,E=null,q=null,G=null,F=null,L=typeof XRWebGLBinding<"u",z=new qZ,D={},N=Q.getContextAttributes(),w=null,y=null,V=[],I=[],A=new p0,C=null,M=null,B=new AJ;B.viewport=new HJ;let l=new AJ;l.viewport=new HJ;let v=[B,l],f=new yQ,r=null,S=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(n){let $0=V[n];if($0===void 0)$0=new j9,V[n]=$0;return $0.getTargetRaySpace()},this.getControllerGrip=function(n){let $0=V[n];if($0===void 0)$0=new j9,V[n]=$0;return $0.getGripSpace()},this.getHand=function(n){let $0=V[n];if($0===void 0)$0=new j9,V[n]=$0;return $0.getHandSpace()};function d(n){let $0=I.indexOf(n.inputSource);if($0===-1)return;let Z0=V[$0];if(Z0!==void 0)Z0.update(n.inputSource,n.frame,X||K),Z0.dispatchEvent({type:n.type,data:n.inputSource})}function o(){W.removeEventListener("select",d),W.removeEventListener("selectstart",d),W.removeEventListener("selectend",d),W.removeEventListener("squeeze",d),W.removeEventListener("squeezestart",d),W.removeEventListener("squeezeend",d),W.removeEventListener("end",o),W.removeEventListener("inputsourceschange",m);for(let n=0;n<V.length;n++){let $0=I[n];if($0===null)continue;I[n]=null,V[n].disconnect($0)}r=null,S=null,z.reset();for(let n in D)delete D[n];if(J.setRenderTarget(w),G=null,q=null,E=null,W=null,y=null,f0.stop(),$.isPresenting=!1,J.setPixelRatio(C),J.setSize(A.width,A.height,!1),M!==null){let n=M.camera;n.fov=M.fov,n.zoom=M.zoom,n.updateProjectionMatrix(),M=null}$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(n){if(Z=n,$.isPresenting===!0)P0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(n){if(H=n,$.isPresenting===!0)P0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||K},this.setReferenceSpace=function(n){X=n},this.getBaseLayer=function(){return q!==null?q:G},this.getBinding=function(){if(E===null&&L)E=new XRWebGLBinding(W,Q);return E},this.getFrame=function(){return F},this.getSession=function(){return W},this.setSession=async function(n){if(W=n,W!==null){if(w=J.getRenderTarget(),W.addEventListener("select",d),W.addEventListener("selectstart",d),W.addEventListener("selectend",d),W.addEventListener("squeeze",d),W.addEventListener("squeezestart",d),W.addEventListener("squeezeend",d),W.addEventListener("end",o),W.addEventListener("inputsourceschange",m),N.xrCompatible!==!0)await Q.makeXRCompatible();if(C=J.getPixelRatio(),J.getSize(A),!(L&&("createProjectionLayer"in XRWebGLBinding.prototype))){let Z0={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:Z};G=new XRWebGLLayer(W,Q,Z0),W.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),y=new fJ(G.framebufferWidth,G.framebufferHeight,{format:Q8,type:nJ,colorSpace:J.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1,storeMultisampledDepthBuffer:G.ignoreDepthValues===!1,storeMultisampledStencilBuffer:G.ignoreDepthValues===!1})}else{let Z0=null,A0=null,_0=null;if(N.depth)_0=N.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,Z0=N.stencil?f8:v8,A0=N.stencil?q9:A8;let B0={colorFormat:Q.RGBA8,depthFormat:_0,scaleFactor:Z};E=this.getBinding(),q=E.createProjectionLayer(B0),W.updateRenderState({layers:[q]}),J.setPixelRatio(1),J.setSize(q.textureWidth,q.textureHeight,!1),y=new fJ(q.textureWidth,q.textureHeight,{format:Q8,type:nJ,depthTexture:new p8(q.textureWidth,q.textureHeight,A0,void 0,void 0,void 0,void 0,void 0,void 0,Z0),stencilBuffer:N.stencil,colorSpace:J.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1,storeMultisampledDepthBuffer:q.ignoreDepthValues===!1,storeMultisampledStencilBuffer:q.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(Y),X=null,K=await W.requestReferenceSpace(H),f0.setContext(W),f0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(W!==null)return W.environmentBlendMode},this.getDepthTexture=function(){return z.getDepthTexture()};function m(n){for(let $0=0;$0<n.removed.length;$0++){let Z0=n.removed[$0],A0=I.indexOf(Z0);if(A0>=0)I[A0]=null,V[A0].disconnect(Z0)}for(let $0=0;$0<n.added.length;$0++){let Z0=n.added[$0],A0=I.indexOf(Z0);if(A0===-1){for(let B0=0;B0<V.length;B0++)if(B0>=I.length){I.push(Z0),A0=B0;break}else if(I[B0]===null){I[B0]=Z0,A0=B0;break}if(A0===-1)break}let _0=V[A0];if(_0)_0.connect(Z0)}}let Q0=new x,c=new x;function a(n,$0,Z0){Q0.setFromMatrixPosition($0.matrixWorld),c.setFromMatrixPosition(Z0.matrixWorld);let A0=Q0.distanceTo(c),_0=$0.projectionMatrix.elements,B0=Z0.projectionMatrix.elements,NJ=_0[14]/(_0[10]-1),b0=_0[14]/(_0[10]+1),l0=(_0[9]+1)/_0[5],o0=(_0[9]-1)/_0[5],d0=(_0[8]-1)/_0[0],RJ=(B0[8]+1)/B0[0],WJ=NJ*d0,wJ=NJ*RJ,EJ=A0/(-d0+RJ),qJ=EJ*-d0;if($0.matrixWorld.decompose(n.position,n.quaternion,n.scale),n.translateX(qJ),n.translateZ(EJ),n.matrixWorld.compose(n.position,n.quaternion,n.scale),n.matrixWorldInverse.copy(n.matrixWorld).invert(),_0[10]===-1)n.projectionMatrix.copy($0.projectionMatrix),n.projectionMatrixInverse.copy($0.projectionMatrixInverse);else{let P=NJ+EJ,CJ=b0+EJ,n0=WJ-qJ,YJ=wJ+(A0-qJ),k=l0*b0/CJ*P,O=o0*b0/CJ*P;n.projectionMatrix.makePerspective(n0,YJ,k,O,P,CJ),n.projectionMatrixInverse.copy(n.projectionMatrix).invert()}}function J0(n,$0){if($0===null)n.matrixWorld.copy(n.matrix);else n.matrixWorld.multiplyMatrices($0.matrixWorld,n.matrix);n.matrixWorldInverse.copy(n.matrixWorld).invert()}this.updateCamera=function(n){if(W===null)return;let{near:$0,far:Z0}=n;if(z.texture!==null){if(z.depthNear>0)$0=z.depthNear;if(z.depthFar>0)Z0=z.depthFar}if(f.near=l.near=B.near=$0,f.far=l.far=B.far=Z0,r!==f.near||S!==f.far)W.updateRenderState({depthNear:f.near,depthFar:f.far}),r=f.near,S=f.far;f.layers.mask=n.layers.mask|6,B.layers.mask=f.layers.mask&-5,l.layers.mask=f.layers.mask&-3;let A0=n.parent,_0=f.cameras;J0(f,A0);for(let B0=0;B0<_0.length;B0++)J0(_0[B0],A0);if(_0.length===2)a(f,B,l);else f.projectionMatrix.copy(B.projectionMatrix);if(M===null&&n.isPerspectiveCamera)M={camera:n,fov:n.fov,zoom:n.zoom};C0(n,f,A0)};function C0(n,$0,Z0){if(Z0===null)n.matrix.copy($0.matrixWorld);else n.matrix.copy(Z0.matrixWorld),n.matrix.invert(),n.matrix.multiply($0.matrixWorld);if(n.matrix.decompose(n.position,n.quaternion,n.scale),n.updateMatrixWorld(!0),n.projectionMatrix.copy($0.projectionMatrix),n.projectionMatrixInverse.copy($0.projectionMatrixInverse),n.isPerspectiveCamera)n.fov=X6*2*Math.atan(1/n.projectionMatrix.elements[5]),n.zoom=1}this.getCamera=function(){return f},this.getFoveation=function(){if(q===null&&G===null)return;return Y},this.setFoveation=function(n){if(Y=n,q!==null)q.fixedFoveation=n;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=n},this.hasDepthSensing=function(){return z.texture!==null},this.getDepthSensingMesh=function(){return z.getMesh(f)},this.getCameraTexture=function(n){return D[n]};let z0=null;function JJ(n,$0){if(U=$0.getViewerPose(X||K),F=$0,U!==null){let Z0=U.views;if(G!==null)J.setRenderTargetFramebuffer(y,G.framebuffer),J.setRenderTarget(y);let A0=!1;if(Z0.length!==f.cameras.length)f.cameras.length=0,A0=!0;for(let b0=0;b0<Z0.length;b0++){let l0=Z0[b0],o0=null;if(G!==null)o0=G.getViewport(l0);else{let RJ=E.getViewSubImage(q,l0);if(o0=RJ.viewport,b0===0)J.setRenderTargetTextures(y,RJ.colorTexture,RJ.depthStencilTexture),J.setRenderTarget(y)}let d0=v[b0];if(d0===void 0)d0=new AJ,d0.layers.enable(b0),d0.viewport=new HJ,v[b0]=d0;if(d0.matrix.fromArray(l0.transform.matrix),d0.matrix.decompose(d0.position,d0.quaternion,d0.scale),d0.projectionMatrix.fromArray(l0.projectionMatrix),d0.projectionMatrixInverse.copy(d0.projectionMatrix).invert(),d0.viewport.set(o0.x,o0.y,o0.width,o0.height),b0===0)f.matrix.copy(d0.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale);if(A0===!0)f.cameras.push(d0)}let _0=W.enabledFeatures;if(_0&&_0.includes("depth-sensing")&&W.depthUsage=="gpu-optimized"&&L){E=$.getBinding();let b0=E.getDepthInformation(Z0[0]);if(b0&&b0.isValid&&b0.texture)z.init(b0,W.renderState)}if(_0&&_0.includes("camera-access")&&L){J.state.unbindTexture(),E=$.getBinding();for(let b0=0;b0<Z0.length;b0++){let l0=Z0[b0].camera;if(l0){let o0=D[l0];if(!o0)o0=new _6,D[l0]=o0;let d0=E.getCameraImage(l0);o0.sourceTexture=d0}}}}for(let Z0=0;Z0<V.length;Z0++){let A0=I[Z0],_0=V[Z0];if(A0!==null&&_0!==void 0)_0.update(A0,$0,X||K)}if(z0)z0(n,$0);if($0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:$0});F=null}let f0=new $Z;f0.setAnimationLoop(JJ),this.setAnimationLoop=function(n){z0=n},this.dispose=function(){}}}var rU=new KJ,FZ=new S0;FZ.set(-1,0,0,0,1,0,0,0,1);function tU(J,Q){function $(D,N){if(D.matrixAutoUpdate===!0)D.updateMatrix();N.value.copy(D.matrix)}function W(D,N){if(N.color.getRGB(D.fogColor.value,RQ(J)),N.isFog)D.fogNear.value=N.near,D.fogFar.value=N.far;else if(N.isFogExp2)D.fogDensity.value=N.density}function Z(D,N,w,y,V){if(N.isNodeMaterial)N.uniformsNeedUpdate=!1;else if(N.isMeshBasicMaterial)K(D,N);else if(N.isMeshLambertMaterial){if(K(D,N),N.envMap)D.envMapIntensity.value=N.envMapIntensity}else if(N.isMeshToonMaterial)K(D,N),q(D,N);else if(N.isMeshPhongMaterial){if(K(D,N),E(D,N),N.envMap)D.envMapIntensity.value=N.envMapIntensity}else if(N.isMeshStandardMaterial){if(K(D,N),G(D,N),N.isMeshPhysicalMaterial)F(D,N,V)}else if(N.isMeshMatcapMaterial)K(D,N),L(D,N);else if(N.isMeshDepthMaterial)K(D,N);else if(N.isMeshDistanceMaterial)K(D,N),z(D,N);else if(N.isMeshNormalMaterial)K(D,N);else if(N.isLineBasicMaterial){if(H(D,N),N.isLineDashedMaterial)Y(D,N)}else if(N.isPointsMaterial)X(D,N,w,y);else if(N.isSpriteMaterial)U(D,N);else if(N.isShadowMaterial)D.color.value.copy(N.color),D.opacity.value=N.opacity;else if(N.isShaderMaterial)N.uniformsNeedUpdate=!1}function K(D,N){if(D.opacity.value=N.opacity,N.color)D.diffuse.value.copy(N.color);if(N.emissive)D.emissive.value.copy(N.emissive).multiplyScalar(N.emissiveIntensity);if(N.map)D.map.value=N.map,$(N.map,D.mapTransform);if(N.alphaMap)D.alphaMap.value=N.alphaMap,$(N.alphaMap,D.alphaMapTransform);if(N.bumpMap){if(D.bumpMap.value=N.bumpMap,$(N.bumpMap,D.bumpMapTransform),D.bumpScale.value=N.bumpScale,N.side===TJ)D.bumpScale.value*=-1}if(N.normalMap){if(D.normalMap.value=N.normalMap,$(N.normalMap,D.normalMapTransform),D.normalScale.value.copy(N.normalScale),N.side===TJ)D.normalScale.value.negate()}if(N.displacementMap)D.displacementMap.value=N.displacementMap,$(N.displacementMap,D.displacementMapTransform),D.displacementScale.value=N.displacementScale,D.displacementBias.value=N.displacementBias;if(N.emissiveMap)D.emissiveMap.value=N.emissiveMap,$(N.emissiveMap,D.emissiveMapTransform);if(N.specularMap)D.specularMap.value=N.specularMap,$(N.specularMap,D.specularMapTransform);if(N.alphaTest>0)D.alphaTest.value=N.alphaTest;let w=Q.get(N),y=w.envMap,V=w.envMapRotation;if(y){if(D.envMap.value=y,D.envMapRotation.value.setFromMatrix4(rU.makeRotationFromEuler(V)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(FZ);D.reflectivity.value=N.reflectivity,D.ior.value=N.ior,D.refractionRatio.value=N.refractionRatio}if(N.lightMap)D.lightMap.value=N.lightMap,D.lightMapIntensity.value=N.lightMapIntensity,$(N.lightMap,D.lightMapTransform);if(N.aoMap)D.aoMap.value=N.aoMap,D.aoMapIntensity.value=N.aoMapIntensity,$(N.aoMap,D.aoMapTransform)}function H(D,N){if(D.diffuse.value.copy(N.color),D.opacity.value=N.opacity,N.map)D.map.value=N.map,$(N.map,D.mapTransform)}function Y(D,N){D.dashSize.value=N.dashSize,D.totalSize.value=N.dashSize+N.gapSize,D.scale.value=N.scale}function X(D,N,w,y){if(D.diffuse.value.copy(N.color),D.opacity.value=N.opacity,D.size.value=N.size*w,D.scale.value=y*0.5,N.map)D.map.value=N.map,$(N.map,D.uvTransform);if(N.alphaMap)D.alphaMap.value=N.alphaMap,$(N.alphaMap,D.alphaMapTransform);if(N.alphaTest>0)D.alphaTest.value=N.alphaTest}function U(D,N){if(D.diffuse.value.copy(N.color),D.opacity.value=N.opacity,D.rotation.value=N.rotation,N.map)D.map.value=N.map,$(N.map,D.mapTransform);if(N.alphaMap)D.alphaMap.value=N.alphaMap,$(N.alphaMap,D.alphaMapTransform);if(N.alphaTest>0)D.alphaTest.value=N.alphaTest}function E(D,N){D.specular.value.copy(N.specular),D.shininess.value=Math.max(N.shininess,0.0001)}function q(D,N){if(N.gradientMap)D.gradientMap.value=N.gradientMap}function G(D,N){if(D.metalness.value=N.metalness,N.metalnessMap)D.metalnessMap.value=N.metalnessMap,$(N.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=N.roughness,N.roughnessMap)D.roughnessMap.value=N.roughnessMap,$(N.roughnessMap,D.roughnessMapTransform);if(N.envMap)D.envMapIntensity.value=N.envMapIntensity}function F(D,N,w){if(D.ior.value=N.ior,N.sheen>0){if(D.sheenColor.value.copy(N.sheenColor).multiplyScalar(N.sheen),D.sheenRoughness.value=N.sheenRoughness,N.sheenColorMap)D.sheenColorMap.value=N.sheenColorMap,$(N.sheenColorMap,D.sheenColorMapTransform);if(N.sheenRoughnessMap)D.sheenRoughnessMap.value=N.sheenRoughnessMap,$(N.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(N.clearcoat>0){if(D.clearcoat.value=N.clearcoat,D.clearcoatRoughness.value=N.clearcoatRoughness,N.clearcoatMap)D.clearcoatMap.value=N.clearcoatMap,$(N.clearcoatMap,D.clearcoatMapTransform);if(N.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=N.clearcoatRoughnessMap,$(N.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(N.clearcoatNormalMap){if(D.clearcoatNormalMap.value=N.clearcoatNormalMap,$(N.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(N.clearcoatNormalScale),N.side===TJ)D.clearcoatNormalScale.value.negate()}}if(N.dispersion>0)D.dispersion.value=N.dispersion;if(N.retroreflectivity>0)D.retroreflectivity.value=N.retroreflectivity;if(N.iridescence>0){if(D.iridescence.value=N.iridescence,D.iridescenceIOR.value=N.iridescenceIOR,D.iridescenceThicknessMinimum.value=N.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=N.iridescenceThicknessRange[1],N.iridescenceMap)D.iridescenceMap.value=N.iridescenceMap,$(N.iridescenceMap,D.iridescenceMapTransform);if(N.iridescenceThicknessMap)D.iridescenceThicknessMap.value=N.iridescenceThicknessMap,$(N.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(N.transmission>0){if(D.transmission.value=N.transmission,D.transmissionSamplerMap.value=w.texture,D.transmissionSamplerSize.value.set(w.width,w.height),N.transmissionMap)D.transmissionMap.value=N.transmissionMap,$(N.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=N.thickness,N.thicknessMap)D.thicknessMap.value=N.thicknessMap,$(N.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=N.attenuationDistance,D.attenuationColor.value.copy(N.attenuationColor)}if(N.anisotropy>0){if(D.anisotropyVector.value.set(N.anisotropy*Math.cos(N.anisotropyRotation),N.anisotropy*Math.sin(N.anisotropyRotation)),N.anisotropyMap)D.anisotropyMap.value=N.anisotropyMap,$(N.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=N.specularIntensity,D.specularColor.value.copy(N.specularColor),N.specularColorMap)D.specularColorMap.value=N.specularColorMap,$(N.specularColorMap,D.specularColorMapTransform);if(N.specularIntensityMap)D.specularIntensityMap.value=N.specularIntensityMap,$(N.specularIntensityMap,D.specularIntensityMapTransform)}function L(D,N){if(N.matcap)D.matcap.value=N.matcap}function z(D,N){let w=Q.get(N).light;D.referencePosition.value.setFromMatrixPosition(w.matrixWorld),D.nearDistance.value=w.shadow.camera.near,D.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:W,refreshMaterialUniforms:Z}}function eU(J,Q,$,W){let Z={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(V,I){let A=I.program;W.uniformBlockBinding(V,A)}function U(V,I){let A=Z[V.id];if(A===void 0)D(V),A=E(V),Z[V.id]=A,V.addEventListener("dispose",w);let C=I.program;W.updateUBOMapping(V,C);let M=Q.render.frame;if(K[V.id]!==M)G(V),K[V.id]=M}function E(V){let I=q();V.__bindingPointIndex=I;let A=J.createBuffer(),C=V.__size,M=V.usage;return J.bindBuffer(J.UNIFORM_BUFFER,A),J.bufferData(J.UNIFORM_BUFFER,C,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,I,A),A}function q(){for(let V=0;V<Y;V++)if(H.indexOf(V)===-1)return H.push(V),V;return T0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(V){let I=Z[V.id],A=V.uniforms,C=V.__cache;J.bindBuffer(J.UNIFORM_BUFFER,I);for(let M=0,B=A.length;M<B;M++){let l=A[M];if(Array.isArray(l))for(let v=0,f=l.length;v<f;v++)F(l[v],M,v,C);else F(l,M,0,C)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(V,I,A,C){if(z(V,I,A,C)===!0){let{__offset:M,value:B}=V;if(Array.isArray(B)){let l=0;for(let v=0;v<B.length;v++){let f=B[v],r=N(f);if(L(f,V.__data,l),typeof f!=="number"&&typeof f!=="boolean"&&!f.isMatrix3&&!ArrayBuffer.isView(f))l+=r.storage/Float32Array.BYTES_PER_ELEMENT}}else L(B,V.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,M,V.__data)}}function L(V,I,A){if(typeof V==="number"||typeof V==="boolean")I[0]=V;else if(V.isMatrix3)I[0]=V.elements[0],I[1]=V.elements[1],I[2]=V.elements[2],I[3]=0,I[4]=V.elements[3],I[5]=V.elements[4],I[6]=V.elements[5],I[7]=0,I[8]=V.elements[6],I[9]=V.elements[7],I[10]=V.elements[8],I[11]=0;else if(ArrayBuffer.isView(V))I.set(new V.constructor(V.buffer,V.byteOffset,I.length));else V.toArray(I,A)}function z(V,I,A,C){let M=V.value,B=I+"_"+A;if(C[B]===void 0){if(typeof M==="number"||typeof M==="boolean")C[B]=M;else if(ArrayBuffer.isView(M))C[B]=M.slice();else C[B]=M.clone();return!0}else{let l=C[B];if(typeof M==="number"||typeof M==="boolean"){if(l!==M)return C[B]=M,!0}else if(ArrayBuffer.isView(M))return!0;else if(l.equals(M)===!1)return l.copy(M),!0}return!1}function D(V){let I=V.uniforms,A=0,C=16;for(let B=0,l=I.length;B<l;B++){let v=Array.isArray(I[B])?I[B]:[I[B]];for(let f=0,r=v.length;f<r;f++){let S=v[f],d=Array.isArray(S.value)?S.value:[S.value];for(let o=0,m=d.length;o<m;o++){let Q0=d[o],c=N(Q0),a=A%C,J0=a%c.boundary,C0=a+J0;if(A+=J0,C0!==0&&C-C0<c.storage)A+=C-C0;S.__data=new Float32Array(c.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=A,A+=c.storage}}}let M=A%C;if(M>0)A+=C-M;return V.__size=A,V.__cache={},this}function N(V){let I={boundary:0,storage:0};if(typeof V==="number"||typeof V==="boolean")I.boundary=4,I.storage=4;else if(V.isVector2)I.boundary=8,I.storage=8;else if(V.isVector3||V.isColor)I.boundary=16,I.storage=12;else if(V.isVector4)I.boundary=16,I.storage=16;else if(V.isMatrix3)I.boundary=48,I.storage=48;else if(V.isMatrix4)I.boundary=64,I.storage=64;else if(V.isTexture)P0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(V))I.boundary=16,I.storage=V.byteLength;else P0("WebGLRenderer: Unsupported uniform value type.",V);return I}function w(V){let I=V.target;I.removeEventListener("dispose",w);let A=H.indexOf(I.__bindingPointIndex);H.splice(A,1),J.deleteBuffer(Z[I.id]),delete Z[I.id],delete K[I.id]}function y(){for(let V in Z)J.deleteBuffer(Z[V]);H=[],Z={},K={}}return{bind:X,update:U,dispose:y}}var JG=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$8=null;function QG(){if($8===null)$8=new FQ(JG,16,16,h8,J8),$8.name="DFG_LUT",$8.minFilter=SJ,$8.magFilter=SJ,$8.wrapS=N6,$8.wrapT=N6,$8.generateMipmaps=!1,$8.needsUpdate=!0;return $8}class iQ{constructor(J={}){let{canvas:Q=AW(),context:$=null,depth:W=!0,stencil:Z=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:E=!1,reversedDepthBuffer:q=!1,outputBufferType:G=nJ}=J;this.isWebGLRenderer=!0;let F;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=$.getContextAttributes().alpha}else F=K;let L=G,z=new Set([_7,C7,w7]),D=new Set([nJ,A8,P9,q9,z7,A7]),N=new Uint32Array(4),w=new Int32Array(4),y=new x,V=null,I=null,A=[],C=[],M=null;this.domElement=Q,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cJ,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,l=!1,v=null,f=null,r=null,S=null;this._outputColorSpace=MW;let d=0,o=0,m=null,Q0=-1,c=null,a=new HJ,J0=new HJ,C0=null,z0=new m0(0),JJ=0,f0=Q.width,n=Q.height,$0=1,Z0=null,A0=null,_0=new HJ(0,0,f0,n),B0=new HJ(0,0,f0,n),NJ=!1,b0=new v9,l0=!1,o0=!1,d0=new KJ,RJ=new x,WJ=new HJ,wJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},EJ=!1;function qJ(){return m===null?$0:1}let P=$;function CJ(R,T){return Q.getContext(R,T)}let n0,YJ,k,O,_,g,e,K0,X0,u,i,D0,V0,U0,W0,I0,w0,c0,j,H0,s,Y0,F0;try{let R={alpha:!0,depth:W,stencil:Z,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:E};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${C$}`);if(Q.addEventListener("webglcontextlost",j0,!1),Q.addEventListener("webglcontextrestored",QJ,!1),Q.addEventListener("webglcontextcreationerror",s0,!1),P===null){if(P=CJ("webgl2",R),P===null)if(CJ("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}t()}catch(R){throw Q.removeEventListener("webglcontextlost",j0,!1),Q.removeEventListener("webglcontextrestored",QJ,!1),Q.removeEventListener("webglcontextcreationerror",s0,!1),T0("WebGLRenderer: "+R.message),R}function t(){if(n0=new XX(P),n0.init(),s=new iU(P,n0),YJ=new tY(P,n0,J,s),k=new nU(P,n0),YJ.reversedDepthBuffer&&q)k.buffers.depth.setReversed(!0);f=P.createFramebuffer(),r=P.createFramebuffer(),S=P.createFramebuffer(),O=new NX(P),_=new jU,g=new sU(P,n0,k,_,YJ,s,O),e=new YX(B),K0=new qK(P),Y0=new aY(P,K0),X0=new UX(P,K0,O,Y0),u=new qX(P,X0,K0,Y0,O),c0=new EX(P,YJ,g),W0=new eY(_),i=new SU(B,e,n0,YJ,Y0,W0),D0=new tU(B,_),V0=new vU,U0=new pU(n0),w0=new oY(B,e,k,u,F,Y),I0=new cU(B,u,YJ),F0=new eU(P,O,YJ,k),j=new rY(P,n0,O),H0=new GX(P,n0,O),O.programs=i.programs,B.capabilities=YJ,B.extensions=n0,B.properties=_,B.renderLists=V0,B.shadowMap=I0,B.state=k,B.info=O}if(L!==nJ)M=new FX(L,Q.width,Q.height,H,W,Z);let N0=new DZ(B,P);this.xr=N0,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let R=n0.get("WEBGL_lose_context");if(R)R.loseContext()},this.forceContextRestore=function(){let R=n0.get("WEBGL_lose_context");if(R)R.restoreContext()},this.getPixelRatio=function(){return $0},this.setPixelRatio=function(R){if(R===void 0)return;$0=R,this.setSize(f0,n,!1)},this.getSize=function(R){return R.set(f0,n)},this.setSize=function(R,T,p=!0){if(N0.isPresenting){P0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(f0=R,n=T,Q.width=Math.floor(R*$0),Q.height=Math.floor(T*$0),p===!0)Q.style.width=R+"px",Q.style.height=T+"px";if(M!==null)M.setSize(Q.width,Q.height);this.setViewport(0,0,R,T)},this.getDrawingBufferSize=function(R){return R.set(f0*$0,n*$0).floor()},this.setDrawingBufferSize=function(R,T,p){f0=R,n=T,$0=p,Q.width=Math.floor(R*p),Q.height=Math.floor(T*p),this.setViewport(0,0,R,T)},this.setEffects=function(R){if(L===nJ){T0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let T=0;T<R.length;T++)if(R[T].isOutputPass===!0){P0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(a)},this.getViewport=function(R){return R.copy(_0)},this.setViewport=function(R,T,p,h){if(R.isVector4)_0.set(R.x,R.y,R.z,R.w);else _0.set(R,T,p,h);k.viewport(a.copy(_0).multiplyScalar($0).round())},this.getScissor=function(R){return R.copy(B0)},this.setScissor=function(R,T,p,h){if(R.isVector4)B0.set(R.x,R.y,R.z,R.w);else B0.set(R,T,p,h);k.scissor(J0.copy(B0).multiplyScalar($0).round())},this.getScissorTest=function(){return NJ},this.setScissorTest=function(R){k.setScissorTest(NJ=R)},this.setOpaqueSort=function(R){Z0=R},this.setTransparentSort=function(R){A0=R},this.getClearColor=function(R){return R.copy(w0.getClearColor())},this.setClearColor=function(){w0.setClearColor(...arguments)},this.getClearAlpha=function(){return w0.getClearAlpha()},this.setClearAlpha=function(){w0.setClearAlpha(...arguments)},this.clear=function(R=!0,T=!0,p=!0){let h=0;if(R){let b=!1;if(m!==null){let q0=m.texture.format;b=z.has(q0)}if(b){let q0=m.texture.type,R0=D.has(q0),E0=w0.getClearColor(),M0=w0.getClearAlpha(),L0=E0.r,y0=E0.g,h0=E0.b;if(R0)N[0]=L0,N[1]=y0,N[2]=h0,N[3]=M0,P.clearBufferuiv(P.COLOR,0,N);else w[0]=L0,w[1]=y0,w[2]=h0,w[3]=M0,P.clearBufferiv(P.COLOR,0,w)}else h|=P.COLOR_BUFFER_BIT}if(T)h|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(p)h|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(h!==0)P.clear(h)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),v=R},this.dispose=function(){Q.removeEventListener("webglcontextlost",j0,!1),Q.removeEventListener("webglcontextrestored",QJ,!1),Q.removeEventListener("webglcontextcreationerror",s0,!1),w0.dispose(),V0.dispose(),U0.dispose(),_.dispose(),e.dispose(),u.dispose(),Y0.dispose(),F0.dispose(),i.dispose(),N0.dispose(),N0.removeEventListener("sessionstart",aQ),N0.removeEventListener("sessionend",rQ),w8.stop()};function j0(R){R.preventDefault(),GQ("WebGLRenderer: Context Lost."),l=!0}function QJ(){GQ("WebGLRenderer: Context Restored."),l=!1;let R=O.autoReset,T=I0.enabled,p=I0.autoUpdate,h=I0.needsUpdate,b=I0.type;t(),O.autoReset=R,I0.enabled=T,I0.autoUpdate=p,I0.needsUpdate=h,I0.type=b}function s0(R){T0("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function iJ(R){let T=R.target;T.removeEventListener("dispose",iJ),Z8(T)}function Z8(R){MZ(R),_.remove(R)}function MZ(R){let T=_.get(R).programs;if(T!==void 0){if(T.forEach(function(p){i.releaseProgram(p)}),R.isShaderMaterial)i.releaseShaderCache(R)}}this.renderBufferDirect=function(R,T,p,h,b,q0){if(T===null)T=wJ;let R0=b.isMesh&&b.matrixWorld.determinantAffine()<0,E0=VZ(R,T,p,h,b);k.setMaterial(h,R0);let M0=p.index,L0=1;if(h.wireframe===!0){if(M0=X0.getWireframeAttribute(p),M0===void 0)return;L0=2}let y0=p.drawRange,h0=p.attributes.position,k0=y0.start*L0,i0=(y0.start+y0.count)*L0;if(q0!==null)k0=Math.max(k0,q0.start*L0),i0=Math.min(i0,(q0.start+q0.count)*L0);if(M0!==null)k0=Math.max(k0,0),i0=Math.min(i0,M0.count);else if(h0!==void 0&&h0!==null)k0=Math.max(k0,0),i0=Math.min(i0,h0.count);let UJ=i0-k0;if(UJ<0||UJ===1/0)return;Y0.setup(b,h,E0,p,M0);let ZJ,t0=j;if(M0!==null)ZJ=K0.get(M0),t0=H0,t0.setIndex(ZJ);if(b.isMesh)if(h.wireframe===!0)k.setLineWidth(h.wireframeLinewidth*qJ()),t0.setMode(P.LINES);else t0.setMode(P.TRIANGLES);else if(b.isLine){let kJ=h.linewidth;if(kJ===void 0)kJ=1;if(k.setLineWidth(kJ*qJ()),b.isLineSegments)t0.setMode(P.LINES);else if(b.isLineLoop)t0.setMode(P.LINE_LOOP);else t0.setMode(P.LINE_STRIP)}else if(b.isPoints)t0.setMode(P.POINTS);else if(b.isSprite)t0.setMode(P.TRIANGLES);if(b.isBatchedMesh)if(!n0.get("WEBGL_multi_draw")){let{_multiDrawStarts:kJ,_multiDrawCounts:O0,_multiDrawCount:zJ}=b,u0=M0?K0.get(M0).bytesPerElement:1,hJ=_.get(h).currentProgram.getUniforms();for(let oJ=0;oJ<zJ;oJ++)hJ.setValue(P,"_gl_DrawID",oJ),t0.render(kJ[oJ]/u0,O0[oJ])}else t0.renderMultiDraw(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount);else if(b.isInstancedMesh)t0.renderInstances(k0,UJ,b.count);else if(p.isInstancedBufferGeometry){let kJ=p._maxInstanceCount!==void 0?p._maxInstanceCount:1/0,O0=Math.min(p.instanceCount,kJ);t0.renderInstances(k0,UJ,O0)}else t0.render(k0,UJ)};function oQ(R,T,p,h){if(v!==null&&R.isNodeMaterial)v.setObject(h,R);if(l0===!0)W0.setState(R,p,!1);if(R.transparent===!0&&R.side===tJ&&R.forceSinglePass===!1)R.side=TJ,R.needsUpdate=!0,l9(R,T,h),R.side=G9,R.needsUpdate=!0,l9(R,T,h),R.side=tJ;else l9(R,T,h)}this.compile=function(R,T,p=null){if(p===null)p=R;if(v!==null)v.renderStart(R,T,p);if(I=U0.get(p),I.init(T),C.push(I),p.traverseVisible(function(b){if(b.isLight&&b.layers.test(T.layers)){if(I.pushLight(b),b.castShadow)I.pushShadow(b)}}),R!==p)R.traverseVisible(function(b){if(b.isLight&&b.layers.test(T.layers)){if(I.pushLight(b),b.castShadow)I.pushShadow(b)}});if(I.setupLights(),v!==null)v.updateLights(I.state.lightsArray);if(o0=this.localClippingEnabled,l0=W0.init(this.clippingPlanes,o0),l0===!0)W0.setGlobalState(this.clippingPlanes,T);if(v!==null)I0.render(I.state.shadowsArray,p,T);let h=new Set;if(R.traverse(function(b){if(!(b.isMesh||b.isPoints||b.isLine||b.isSprite))return;let q0=b.material;if(q0)if(Array.isArray(q0))for(let R0=0;R0<q0.length;R0++){let E0=q0[R0];oQ(E0,p,T,b),h.add(E0)}else oQ(q0,p,T,b),h.add(q0)}),I=C.pop(),v!==null)v.renderEnd();return h},this.compileAsync=function(R,T,p=null){let h=this.compile(R,T,p);return new Promise((b)=>{function q0(){if(h.forEach(function(R0){let M0=_.get(R0).currentProgram;if(M0===void 0||M0.isReady())h.delete(R0)}),h.size===0){b(R);return}setTimeout(q0,10)}if(n0.get("KHR_parallel_shader_compile")!==null)q0();else setTimeout(q0,10)})};let g6=null;function kZ(R){if(g6)g6(R)}function aQ(){w8.stop()}function rQ(){w8.start()}let w8=new $Z;if(w8.setAnimationLoop(kZ),typeof self<"u")w8.setContext(self);this.setAnimationLoop=function(R){g6=R,N0.setAnimationLoop(R),R===null?w8.stop():w8.start()},N0.addEventListener("sessionstart",aQ),N0.addEventListener("sessionend",rQ),this.render=function(R,T){if(T!==void 0&&T.isCamera!==!0){T0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(l===!0)return;if(v!==null)v.renderStart(R,T);let p=N0.enabled===!0&&N0.isPresenting===!0,h=M!==null&&(m===null||p)&&M.begin(B,m);if(R.matrixWorldAutoUpdate===!0)R.updateMatrixWorld();if(T.parent===null&&T.matrixWorldAutoUpdate===!0)T.updateMatrixWorld();if(N0.enabled===!0&&N0.isPresenting===!0&&(M===null||M.isCompositing()===!1)){if(N0.cameraAutoUpdate===!0)N0.updateCamera(T);T=N0.getCamera()}if(R.isScene===!0)R.onBeforeRender(B,R,T,m);if(I=U0.get(R,C.length),I.init(T),I.state.textureUnits=g.getTextureUnits(),C.push(I),d0.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),b0.setFromProjectionMatrix(d0,UQ,T.reversedDepth),o0=this.localClippingEnabled,l0=W0.init(this.clippingPlanes,o0),V=V0.get(R,A.length),V.init(),A.push(V),N0.enabled===!0&&N0.isPresenting===!0){let R0=B.xr.getDepthSensingMesh();if(R0!==null)p6(R0,T,-1/0,B.sortObjects)}if(p6(R,T,0,B.sortObjects),V.finish(),v!==null)v.updateLights(I.state.lightsArray);if(B.sortObjects===!0)V.sort(Z0,A0);if(EJ=N0.enabled===!1||N0.isPresenting===!1||N0.hasDepthSensing()===!1,EJ)w0.addToRenderList(V,R);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(l0===!0)W0.beginShadows();let b=I.state.shadowsArray;if(I0.render(b,R,T),l0===!0)W0.endShadows();if((h&&M.hasRenderPass())===!1){let{opaque:R0,transmissive:E0}=V;if(I.setupLights(),T.isArrayCamera){let M0=T.cameras;if(E0.length>0)for(let L0=0,y0=M0.length;L0<y0;L0++){let h0=M0[L0];eQ(R0,E0,R,h0)}if(EJ)w0.render(R);for(let L0=0,y0=M0.length;L0<y0;L0++){let h0=M0[L0];tQ(V,R,h0,h0.viewport)}}else{if(E0.length>0)eQ(R0,E0,R,T);if(EJ)w0.render(R);tQ(V,R,T)}}if(m!==null&&o===0)g.updateMultisampleRenderTarget(m),g.updateRenderTargetMipmap(m);if(h)M.end(B);if(R.isScene===!0)R.onAfterRender(B,R,T);if(Y0.resetDefaultState(),Q0=-1,c=null,C.pop(),C.length>0){if(I=C[C.length-1],g.setTextureUnits(I.state.textureUnits),l0===!0)W0.setGlobalState(B.clippingPlanes,I.state.camera)}else I=null;if(A.pop(),A.length>0)V=A[A.length-1];else V=null;if(v!==null)v.renderEnd()};function p6(R,T,p,h){if(R.visible===!1)return;if(R.layers.test(T.layers)){if(R.isGroup)p=R.renderOrder;else if(R.isLOD){if(R.autoUpdate===!0)R.update(T)}else if(R.isLightProbeGrid)I.pushLightProbeGrid(R);else if(R.isLight){if(I.pushLight(R),R.castShadow)I.pushShadow(R)}else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(b0)){if(h)WJ.setFromMatrixPosition(R.matrixWorld).applyMatrix4(d0);let R0=u.update(R),E0=R.material;if(E0.visible)V.push(R,R0,E0,p,WJ.z,null,T)}}else if(R.isMesh||R.isLine||R.isPoints){if(!R.frustumCulled||R.intersectsFrustum(b0)){let R0=u.update(R),E0=R.material;if(h){if(R.boundingSphere!==void 0){if(R.boundingSphere===null)R.computeBoundingSphere();WJ.copy(R.boundingSphere.center)}else{if(R0.boundingSphere===null)R0.computeBoundingSphere();WJ.copy(R0.boundingSphere.center)}WJ.applyMatrix4(R.matrixWorld).applyMatrix4(d0)}if(Array.isArray(E0)){let M0=R0.groups;for(let L0=0,y0=M0.length;L0<y0;L0++){let h0=M0[L0],k0=E0[h0.materialIndex];if(k0&&k0.visible)V.push(R,R0,k0,p,WJ.z,h0,T)}}else if(E0.visible)V.push(R,R0,E0,p,WJ.z,null,T)}}}let q0=R.children;for(let R0=0,E0=q0.length;R0<E0;R0++)p6(q0[R0],T,p,h)}function tQ(R,T,p,h){let{opaque:b,transmissive:q0,transparent:R0}=R;if(I.setupLightsView(p),l0===!0)W0.setGlobalState(B.clippingPlanes,p);if(h)k.viewport(a.copy(h));if(b.length>0)m9(b,T,p);if(q0.length>0)m9(q0,T,p);if(R0.length>0)m9(R0,T,p);k.buffers.depth.setTest(!0),k.buffers.depth.setMask(!0),k.buffers.color.setMask(!0),k.setPolygonOffset(!1)}function eQ(R,T,p,h){if((p.isScene===!0?p.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[h.id]===void 0){let k0=n0.has("EXT_color_buffer_half_float")||n0.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[h.id]=new fJ(1,1,{generateMipmaps:!0,type:k0?J8:nJ,minFilter:y8,samples:Math.max(4,YJ.samples),stencilBuffer:Z,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:x0.workingColorSpace})}let q0=I.state.transmissionRenderTarget[h.id],R0=h.viewport||a;q0.setSize(R0.z*B.transmissionResolutionScale,R0.w*B.transmissionResolutionScale);let E0=B.getRenderTarget(),M0=B.getActiveCubeFace(),L0=B.getActiveMipmapLevel();if(B.setRenderTarget(q0),B.getClearColor(z0),JJ=B.getClearAlpha(),JJ<1)B.setClearColor(16777215,0.5);if(B.clear(),EJ)w0.render(p);let y0=B.toneMapping;B.toneMapping=cJ;let h0=h.viewport;if(h.viewport!==void 0)h.viewport=void 0;if(I.setupLightsView(h),l0===!0)W0.setGlobalState(B.clippingPlanes,h);if(m9(R,p,h),g.updateMultisampleRenderTarget(q0),g.updateRenderTargetMipmap(q0),n0.has("WEBGL_multisampled_render_to_texture")===!1){let k0=!1;for(let i0=0,UJ=T.length;i0<UJ;i0++){let ZJ=T[i0],{object:t0,geometry:kJ,material:O0,group:zJ}=ZJ;if(O0.side===tJ&&t0.layers.test(h.layers)){let u0=O0.side;O0.side=TJ,O0.needsUpdate=!0,J$(t0,p,h,kJ,O0,zJ),O0.side=u0,O0.needsUpdate=!0,k0=!0}}if(k0===!0)g.updateMultisampleRenderTarget(q0),g.updateRenderTargetMipmap(q0)}if(B.setRenderTarget(E0,M0,L0),B.setClearColor(z0,JJ),h0!==void 0)h.viewport=h0;B.toneMapping=y0}function m9(R,T,p){let h=T.isScene===!0?T.overrideMaterial:null;for(let b=0,q0=R.length;b<q0;b++){let R0=R[b],{object:E0,geometry:M0,group:L0}=R0,y0=R0.material;if(y0.allowOverride===!0&&h!==null)y0=h;if(E0.layers.test(p.layers))J$(E0,T,p,M0,y0,L0)}}function J$(R,T,p,h,b,q0){if(v!==null&&b.isNodeMaterial)v.setObject(R,b);if(R.onBeforeRender(B,T,p,h,b,q0),R.modelViewMatrix.multiplyMatrices(p.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),b.onBeforeRender(B,T,p,h,R,q0),b.transparent===!0&&b.side===tJ&&b.forceSinglePass===!1)b.side=TJ,b.needsUpdate=!0,B.renderBufferDirect(p,T,h,b,R,q0),b.side=G9,b.needsUpdate=!0,B.renderBufferDirect(p,T,h,b,R,q0),b.side=tJ;else B.renderBufferDirect(p,T,h,b,R,q0);R.onAfterRender(B,T,p,h,b,q0)}function l9(R,T,p){if(T.isScene!==!0)T=wJ;let h=_.get(R),b=I.state.lights,q0=I.state.shadowsArray,R0=b.state.version,E0=i.getParameters(R,b.state,q0,T,p,I.state.lightProbeGridArray),M0=i.getProgramCacheKey(E0),L0=h.programs;h.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?T.environment:null,h.fog=T.fog;let y0=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;if(h.envMap=e.get(R.envMap||h.environment,y0),h.envMapRotation=h.environment!==null&&R.envMap===null?T.environmentRotation:R.envMapRotation,L0===void 0)R.addEventListener("dispose",iJ),L0=new Map,h.programs=L0;let h0=L0.get(M0);if(h0!==void 0){if(h.currentProgram===h0&&h.lightsStateVersion===R0)return $$(R,E0),h0}else{if(E0.uniforms=i.getUniforms(R),v!==null&&R.isNodeMaterial)v.build(R,p,E0);R.onBeforeCompile(E0,B),h0=i.acquireProgram(E0,M0),L0.set(M0,h0),h.uniforms=E0.uniforms}let k0=h.uniforms;if(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)k0.clippingPlanes=W0.uniform;if($$(R,E0),h.needsLights=IZ(R),h.lightsStateVersion=R0,h.needsLights)k0.ambientLightColor.value=b.state.ambient,k0.lightProbe.value=b.state.probe,k0.sunLights.value=b.state.sun,k0.sunLightShadows.value=b.state.sunShadow,k0.directionalLights.value=b.state.directional,k0.directionalLightShadows.value=b.state.directionalShadow,k0.spotLights.value=b.state.spot,k0.spotLightShadows.value=b.state.spotShadow,k0.rectAreaLights.value=b.state.rectArea,k0.ltc_1.value=b.state.rectAreaLTC1,k0.ltc_2.value=b.state.rectAreaLTC2,k0.pointLights.value=b.state.point,k0.pointLightShadows.value=b.state.pointShadow,k0.hemisphereLights.value=b.state.hemi,k0.sunShadowMatrix.value=b.state.sunShadowMatrix,k0.sunShadowCascade.value=b.state.sunShadowCascade,k0.directionalShadowMatrix.value=b.state.directionalShadowMatrix,k0.spotLightMatrix.value=b.state.spotLightMatrix,k0.spotLightMap.value=b.state.spotLightMap,k0.pointShadowMatrix.value=b.state.pointShadowMatrix;return h.lightProbeGrid=I.state.lightProbeGridArray.length>0,h.currentProgram=h0,h.uniformsList=null,h0}function Q$(R){if(R.uniformsList===null){let T=R.currentProgram.getUniforms();R.uniformsList=p9.seqWithValue(T.seq,R.uniforms)}return R.uniformsList}function $$(R,T){let p=_.get(R);p.outputColorSpace=T.outputColorSpace,p.batching=T.batching,p.batchingColor=T.batchingColor,p.instancing=T.instancing,p.instancingColor=T.instancingColor,p.instancingMorph=T.instancingMorph,p.skinning=T.skinning,p.morphTargets=T.morphTargets,p.morphNormals=T.morphNormals,p.morphColors=T.morphColors,p.morphTargetsCount=T.morphTargetsCount,p.numClippingPlanes=T.numClippingPlanes,p.numIntersection=T.numClipIntersection,p.vertexAlphas=T.vertexAlphas,p.vertexTangents=T.vertexTangents,p.toneMapping=T.toneMapping}function LZ(R,T){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;y.setFromMatrixPosition(T.matrixWorld);for(let p=0,h=R.length;p<h;p++){let b=R[p];if(b.texture!==null&&b.boundingBox.containsPoint(y))return b}return null}function VZ(R,T,p,h,b){if(T.isScene!==!0)T=wJ;g.resetTextureUnits();let q0=T.fog,R0=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?T.environment:null,E0=m===null?B.outputColorSpace:m.isXRRenderTarget===!0?m.texture.colorSpace:x0.workingColorSpace,M0=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap,L0=e.get(h.envMap||R0,M0),y0=h.vertexColors===!0&&!!p.attributes.color&&p.attributes.color.itemSize===4,h0=!!p.attributes.tangent&&(!!h.normalMap||h.anisotropy>0),k0=!!p.morphAttributes.position,i0=!!p.morphAttributes.normal,UJ=!!p.morphAttributes.color,ZJ=cJ;if(h.toneMapped){if(m===null||m.isXRRenderTarget===!0)ZJ=B.toneMapping}let t0=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,kJ=t0!==void 0?t0.length:0,O0=_.get(h),zJ=I.state.lights;if(l0===!0){if(o0===!0||R!==c){let $J=R===c&&h.id===Q0;W0.setState(h,R,$J)}}let u0=!1;if(h.version===O0.__version){if(O0.needsLights&&O0.lightsStateVersion!==zJ.state.version)u0=!0;else if(O0.outputColorSpace!==E0)u0=!0;else if(b.isBatchedMesh&&O0.batching===!1)u0=!0;else if(!b.isBatchedMesh&&O0.batching===!0)u0=!0;else if(b.isBatchedMesh&&O0.batchingColor===!0&&b._colorsTexture===null)u0=!0;else if(b.isBatchedMesh&&O0.batchingColor===!1&&b._colorsTexture!==null)u0=!0;else if(b.isInstancedMesh&&O0.instancing===!1)u0=!0;else if(!b.isInstancedMesh&&O0.instancing===!0)u0=!0;else if(b.isSkinnedMesh&&O0.skinning===!1)u0=!0;else if(!b.isSkinnedMesh&&O0.skinning===!0)u0=!0;else if(b.isInstancedMesh&&O0.instancingColor===!0&&b.instanceColor===null)u0=!0;else if(b.isInstancedMesh&&O0.instancingColor===!1&&b.instanceColor!==null)u0=!0;else if(b.isInstancedMesh&&O0.instancingMorph===!0&&b.morphTexture===null)u0=!0;else if(b.isInstancedMesh&&O0.instancingMorph===!1&&b.morphTexture!==null)u0=!0;else if(O0.envMap!==L0)u0=!0;else if(h.fog===!0&&O0.fog!==q0)u0=!0;else if(O0.numClippingPlanes!==void 0&&(O0.numClippingPlanes!==W0.numPlanes||O0.numIntersection!==W0.numIntersection))u0=!0;else if(O0.vertexAlphas!==y0)u0=!0;else if(O0.vertexTangents!==h0)u0=!0;else if(O0.morphTargets!==k0)u0=!0;else if(O0.morphNormals!==i0)u0=!0;else if(O0.morphColors!==UJ)u0=!0;else if(O0.toneMapping!==ZJ)u0=!0;else if(O0.morphTargetsCount!==kJ)u0=!0;else if(!!O0.lightProbeGrid!==I.state.lightProbeGridArray.length>0)u0=!0}else u0=!0,O0.__version=h.version;let hJ=O0.currentProgram;if(u0===!0){if(hJ=l9(h,T,b),v&&h.isNodeMaterial)v.onUpdateProgram(h,hJ,O0)}let oJ=!1,F8=!1,n8=!1,r0=hJ.getUniforms(),XJ=O0.uniforms;if(k.useProgram(hJ.program))oJ=!0,F8=!0,n8=!0;if(h.id!==Q0)Q0=h.id,F8=!0;if(O0.needsLights){let $J=LZ(I.state.lightProbeGridArray,b);if(O0.lightProbeGrid!==$J)O0.lightProbeGrid=$J,F8=!0}if(oJ||c!==R){if(k.buffers.depth.getReversed()&&R.reversedDepth!==!0)R._reversedDepth=!0,R.updateProjectionMatrix();r0.setValue(P,"projectionMatrix",R.projectionMatrix),r0.setValue(P,"viewMatrix",R.matrixWorldInverse);let R8=r0.map.cameraPosition;if(R8!==void 0)R8.setValue(P,RJ.setFromMatrixPosition(R.matrixWorld));if(YJ.logarithmicDepthBuffer)r0.setValue(P,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2));if(h.isMeshPhongMaterial||h.isMeshToonMaterial||h.isMeshLambertMaterial||h.isMeshBasicMaterial||h.isMeshStandardMaterial||h.isShaderMaterial)r0.setValue(P,"isOrthographic",R.isOrthographicCamera===!0);if(c!==R)c=R,F8=!0,n8=!0}if(O0.needsLights){if(zJ.state.sunShadowMap.length>0)r0.setValue(P,"sunShadowMap",zJ.state.sunShadowMap,g);if(zJ.state.directionalShadowMap.length>0)r0.setValue(P,"directionalShadowMap",zJ.state.directionalShadowMap,g);if(zJ.state.spotShadowMap.length>0)r0.setValue(P,"spotShadowMap",zJ.state.spotShadowMap,g);if(zJ.state.pointShadowMap.length>0)r0.setValue(P,"pointShadowMap",zJ.state.pointShadowMap,g)}if(b.isSkinnedMesh){r0.setOptional(P,b,"bindMatrix"),r0.setOptional(P,b,"bindMatrixInverse");let $J=b.skeleton;if($J){if($J.boneTexture===null)$J.computeBoneTexture();r0.setValue(P,"boneTexture",$J.boneTexture,g)}}if(b.isBatchedMesh){if(r0.setOptional(P,b,"batchingTexture"),r0.setValue(P,"batchingTexture",b._matricesTexture,g),r0.setOptional(P,b,"batchingIdTexture"),r0.setValue(P,"batchingIdTexture",b._indirectTexture,g),r0.setOptional(P,b,"batchingColorTexture"),b._colorsTexture!==null)r0.setValue(P,"batchingColorTexture",b._colorsTexture,g)}let O8=p.morphAttributes;if(O8.position!==void 0||O8.normal!==void 0||O8.color!==void 0)c0.update(b,p,hJ);if(F8||O0.receiveShadow!==b.receiveShadow)O0.receiveShadow=b.receiveShadow,r0.setValue(P,"receiveShadow",b.receiveShadow);if((h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial)&&h.envMap===null&&T.environment!==null)XJ.envMapIntensity.value=T.environmentIntensity;if(XJ.dfgLUT!==void 0)XJ.dfgLUT.value=QG();if(F8){if(r0.setValue(P,"toneMappingExposure",B.toneMappingExposure),O0.needsLights)BZ(XJ,n8);if(q0&&h.fog===!0)D0.refreshFogUniforms(XJ,q0);if(D0.refreshMaterialUniforms(XJ,h,$0,n,I.state.transmissionRenderTarget[R.id]),O0.needsLights&&O0.lightProbeGrid){let $J=O0.lightProbeGrid;XJ.probesSH.value=$J.texture,XJ.probesMin.value.copy($J.boundingBox.min),XJ.probesMax.value.copy($J.boundingBox.max),XJ.probesResolution.value.copy($J.resolution)}p9.upload(P,Q$(O0),XJ,g)}if(h.isShaderMaterial&&h.uniformsNeedUpdate===!0)p9.upload(P,Q$(O0),XJ,g),h.uniformsNeedUpdate=!1;if(h.isSpriteMaterial)r0.setValue(P,"center",b.center);if(r0.setValue(P,"modelViewMatrix",b.modelViewMatrix),r0.setValue(P,"normalMatrix",b.normalMatrix),r0.setValue(P,"modelMatrix",b.matrixWorld),h.uniformsGroups!==void 0){let $J=h.uniformsGroups;for(let R8=0,s8=$J.length;R8<s8;R8++){let Z$=$J[R8];F0.update(Z$,hJ),F0.bind(Z$,hJ)}}return hJ}function BZ(R,T){R.ambientLightColor.needsUpdate=T,R.lightProbe.needsUpdate=T,R.sunLights.needsUpdate=T,R.sunLightShadows.needsUpdate=T,R.directionalLights.needsUpdate=T,R.directionalLightShadows.needsUpdate=T,R.pointLights.needsUpdate=T,R.pointLightShadows.needsUpdate=T,R.spotLights.needsUpdate=T,R.spotLightShadows.needsUpdate=T,R.rectAreaLights.needsUpdate=T,R.hemisphereLights.needsUpdate=T}function IZ(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return d},this.getActiveMipmapLevel=function(){return o},this.getRenderTarget=function(){return m},this.setRenderTargetTextures=function(R,T,p){let h=_.get(R);if(h.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,h.__autoAllocateDepthBuffer===!1)h.__useRenderToTexture=!1;_.get(R.texture).__webglTexture=T,_.get(R.depthTexture).__webglTexture=h.__autoAllocateDepthBuffer?void 0:p,h.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,T){let p=_.get(R);p.__webglFramebuffer=T,p.__useDefaultFramebuffer=T===void 0},this.setRenderTarget=function(R,T=0,p=0){m=R,d=T,o=p;let h=null,b=!1,q0=!1;if(R){let E0=_.get(R);if(E0.__useDefaultFramebuffer!==void 0){k.bindFramebuffer(P.FRAMEBUFFER,E0.__webglFramebuffer),a.copy(R.viewport),J0.copy(R.scissor),C0=R.scissorTest,k.viewport(a),k.scissor(J0),k.setScissorTest(C0),Q0=-1;return}else if(E0.__webglFramebuffer===void 0)g.setupRenderTarget(R);else if(E0.__hasExternalTextures)g.rebindTextures(R,_.get(R.texture).__webglTexture,_.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let y0=R.depthTexture;if(E0.__boundDepthTexture!==y0){if(y0!==null&&_.has(y0)&&(R.width!==y0.image.width||R.height!==y0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");g.setupDepthRenderbuffer(R)}}let M0=R.texture;if(M0.isData3DTexture||M0.isDataArrayTexture||M0.isCompressedArrayTexture)q0=!0;let L0=_.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget){if(Array.isArray(L0[T]))h=L0[T][p];else h=L0[T];b=!0}else if(R.samples>0&&g.useMultisampledRTT(R)===!1)h=_.get(R).__webglMultisampledFramebuffer;else if(Array.isArray(L0))h=L0[p];else h=L0;a.copy(R.viewport),J0.copy(R.scissor),C0=R.scissorTest}else a.copy(_0).multiplyScalar($0).floor(),J0.copy(B0).multiplyScalar($0).floor(),C0=NJ;if(p!==0)h=f;if(k.bindFramebuffer(P.FRAMEBUFFER,h))k.drawBuffers(R,h);if(k.viewport(a),k.scissor(J0),k.setScissorTest(C0),b){let E0=_.get(R.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+T,E0.__webglTexture,p)}else if(q0){let E0=T;for(let M0=0;M0<R.textures.length;M0++){let L0=_.get(R.textures[M0]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+M0,L0.__webglTexture,p,E0)}}else if(R!==null&&p!==0){let E0=_.get(R.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,E0.__webglTexture,p)}Q0=-1};function W$(R){let T=_.get(R);if(T.__readFormat!==R.format||T.__readType!==R.type)T.__readFormat=R.format,T.__readType=R.type,T.__formatReadable=YJ.textureFormatReadable(R.format),T.__typeReadable=YJ.textureTypeReadable(R.type);return T}if(this.readRenderTargetPixels=function(R,T,p,h,b,q0,R0,E0=0){if(!(R&&R.isWebGLRenderTarget)){T0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let M0=_.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&R0!==void 0)M0=M0[R0];if(M0){k.bindFramebuffer(P.FRAMEBUFFER,M0);try{let L0=R.textures[E0],y0=L0.format,h0=L0.type;if(R.textures.length>1)P.readBuffer(P.COLOR_ATTACHMENT0+E0);let k0=W$(L0);if(k0.__formatReadable===!1){T0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(k0.__typeReadable===!1){T0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(T>=0&&T<=R.width-h&&(p>=0&&p<=R.height-b))P.readPixels(T,p,h,b,s.convert(y0),s.convert(h0),q0)}finally{let L0=m!==null?_.get(m).__webglFramebuffer:null;k.bindFramebuffer(P.FRAMEBUFFER,L0)}}},this.readRenderTargetPixelsAsync=async function(R,T,p,h,b,q0,R0,E0=0){if(!(R&&R.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let M0=_.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&R0!==void 0)M0=M0[R0];if(M0)if(T>=0&&T<=R.width-h&&(p>=0&&p<=R.height-b)){k.bindFramebuffer(P.FRAMEBUFFER,M0);let L0=R.textures[E0],y0=L0.format,h0=L0.type;if(R.textures.length>1)P.readBuffer(P.COLOR_ATTACHMENT0+E0);let k0=W$(L0);if(k0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(k0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let i0=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,i0),P.bufferData(P.PIXEL_PACK_BUFFER,q0.byteLength,P.STREAM_READ),P.readPixels(T,p,h,b,s.convert(y0),s.convert(h0),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let UJ=m!==null?_.get(m).__webglFramebuffer:null;k.bindFramebuffer(P.FRAMEBUFFER,UJ);let ZJ=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await CW(P,ZJ,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,i0),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,q0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(i0),P.deleteSync(ZJ),q0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,T=null,p=0){let h=Math.pow(2,-p),b=Math.floor(R.image.width*h),q0=Math.floor(R.image.height*h),R0=T!==null?T.x:0,E0=T!==null?T.y:0;g.setTexture2D(R,0),P.copyTexSubImage2D(P.TEXTURE_2D,p,0,0,R0,E0,b,q0),k.unbindTexture()},this.copyTextureToTexture=function(R,T,p=null,h=null,b=0,q0=0){let R0,E0,M0,L0,y0,h0,k0,i0,UJ,ZJ=R.isCompressedTexture?R.mipmaps[q0]:R.image;if(p!==null)R0=p.max.x-p.min.x,E0=p.max.y-p.min.y,M0=p.isBox3?p.max.z-p.min.z:1,L0=p.min.x,y0=p.min.y,h0=p.isBox3?p.min.z:0;else{let XJ=Math.pow(2,-b);if(R0=Math.floor(ZJ.width*XJ),E0=Math.floor(ZJ.height*XJ),R.isDataArrayTexture)M0=ZJ.depth;else if(R.isData3DTexture)M0=Math.floor(ZJ.depth*XJ);else M0=1;L0=0,y0=0,h0=0}if(h!==null)k0=h.x,i0=h.y,UJ=h.z;else k0=0,i0=0,UJ=0;let t0=s.convert(T.format),kJ=s.convert(T.type),O0;if(T.isData3DTexture)g.setTexture3D(T,0),O0=P.TEXTURE_3D;else if(T.isDataArrayTexture||T.isCompressedArrayTexture)g.setTexture2DArray(T,0),O0=P.TEXTURE_2D_ARRAY;else g.setTexture2D(T,0),O0=P.TEXTURE_2D;k.activeTexture(P.TEXTURE0),k.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,T.flipY),k.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),k.pixelStorei(P.UNPACK_ALIGNMENT,T.unpackAlignment);let zJ=k.getParameter(P.UNPACK_ROW_LENGTH),u0=k.getParameter(P.UNPACK_IMAGE_HEIGHT),hJ=k.getParameter(P.UNPACK_SKIP_PIXELS),oJ=k.getParameter(P.UNPACK_SKIP_ROWS),F8=k.getParameter(P.UNPACK_SKIP_IMAGES);k.pixelStorei(P.UNPACK_ROW_LENGTH,ZJ.width),k.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ZJ.height),k.pixelStorei(P.UNPACK_SKIP_PIXELS,L0),k.pixelStorei(P.UNPACK_SKIP_ROWS,y0),k.pixelStorei(P.UNPACK_SKIP_IMAGES,h0);let n8=R.isDataArrayTexture||R.isData3DTexture,r0=T.isDataArrayTexture||T.isData3DTexture;if(R.isDepthTexture){let XJ=_.get(R),O8=_.get(T),$J=_.get(XJ.__renderTarget),R8=_.get(O8.__renderTarget);k.bindFramebuffer(P.READ_FRAMEBUFFER,$J.__webglFramebuffer),k.bindFramebuffer(P.DRAW_FRAMEBUFFER,R8.__webglFramebuffer);for(let s8=0;s8<M0;s8++){if(n8)P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(R).__webglTexture,b,h0+s8),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(T).__webglTexture,q0,UJ+s8);P.blitFramebuffer(L0,y0,R0,E0,k0,i0,R0,E0,P.DEPTH_BUFFER_BIT,P.NEAREST)}k.bindFramebuffer(P.READ_FRAMEBUFFER,null),k.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(b!==0||R.isRenderTargetTexture||_.has(R)){let XJ=_.get(R),O8=_.get(T);k.bindFramebuffer(P.READ_FRAMEBUFFER,r),k.bindFramebuffer(P.DRAW_FRAMEBUFFER,S);for(let $J=0;$J<M0;$J++){if(n8)P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,XJ.__webglTexture,b,h0+$J);else P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,XJ.__webglTexture,b);if(r0)P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,O8.__webglTexture,q0,UJ+$J);else P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,O8.__webglTexture,q0);if(b!==0)P.blitFramebuffer(L0,y0,R0,E0,k0,i0,R0,E0,P.COLOR_BUFFER_BIT,P.NEAREST);else if(r0)P.copyTexSubImage3D(O0,q0,k0,i0,UJ+$J,L0,y0,R0,E0);else P.copyTexSubImage2D(O0,q0,k0,i0,L0,y0,R0,E0)}k.bindFramebuffer(P.READ_FRAMEBUFFER,null),k.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(r0)if(R.isDataTexture||R.isData3DTexture)P.texSubImage3D(O0,q0,k0,i0,UJ,R0,E0,M0,t0,kJ,ZJ.data);else if(T.isCompressedArrayTexture)P.compressedTexSubImage3D(O0,q0,k0,i0,UJ,R0,E0,M0,t0,ZJ.data);else P.texSubImage3D(O0,q0,k0,i0,UJ,R0,E0,M0,t0,kJ,ZJ);else if(R.isDataTexture)P.texSubImage2D(P.TEXTURE_2D,q0,k0,i0,R0,E0,t0,kJ,ZJ.data);else if(R.isCompressedTexture)P.compressedTexSubImage2D(P.TEXTURE_2D,q0,k0,i0,ZJ.width,ZJ.height,t0,ZJ.data);else P.texSubImage2D(P.TEXTURE_2D,q0,k0,i0,R0,E0,t0,kJ,ZJ);if(k.pixelStorei(P.UNPACK_ROW_LENGTH,zJ),k.pixelStorei(P.UNPACK_IMAGE_HEIGHT,u0),k.pixelStorei(P.UNPACK_SKIP_PIXELS,hJ),k.pixelStorei(P.UNPACK_SKIP_ROWS,oJ),k.pixelStorei(P.UNPACK_SKIP_IMAGES,F8),q0===0&&T.generateMipmaps)P.generateMipmap(O0);k.unbindTexture()},this.initRenderTarget=function(R){if(_.get(R).__webglFramebuffer===void 0)g.setupRenderTarget(R)},this.initTexture=function(R){if(R.isCubeTexture)g.setTextureCube(R,0);else if(R.isData3DTexture)g.setTexture3D(R,0);else if(R.isDataArrayTexture||R.isCompressedArrayTexture)g.setTexture2DArray(R,0);else g.setTexture2D(R,0);k.unbindTexture()},this.resetState=function(){d=0,o=0,m=null,k.reset(),Y0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return UQ}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=x0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=x0._getUnpackColorSpace()}}function OZ(J,Q,$){let W=(J-Q+$)%$;if(W===0)return"center";if(W===1)return"right";if(W===$-1)return"left";return"offstage"}function RZ(J,Q=$G){let $=J.querySelector(".hero-stage"),W=[...J.querySelectorAll(".hero-poster")],Z=[...J.querySelectorAll(".hero-detail")],K=J.querySelector(".hero-controls"),H=J.querySelector(".hero-counter"),Y=J.querySelector(".hero-status"),X=J.querySelector(".hero-autoplay"),U=J.ownerDocument,E=matchMedia("(prefers-reduced-motion: reduce)"),q=matchMedia("(hover: hover) and (pointer: fine)"),G=1,F,L=!E.matches,z=!1,D=!1,N;function w(){clearTimeout(N);let I=L&&!z&&!D&&!U.hidden;if(X.dataset.playing=String(L),X.setAttribute("aria-label",L?"暂停自动轮播":"继续自动轮播"),Y.setAttribute("aria-live",I?"off":"polite"),I)N=setTimeout(()=>y(G+1,!1),3000)}function y(I,A=!0){if(G=(I+W.length)%W.length,W.forEach((C,M)=>{C.dataset.position=OZ(M,G,W.length),C.hidden=C.dataset.position==="offstage",C.tabIndex=M===G?0:-1,Z[M].hidden=M!==G}),H.textContent=`${String(G+1).padStart(2,"0")} / ${String(W.length).padStart(2,"0")}`,A)Y.textContent=`${G+1} / ${W.length} · ${Z[G].querySelector("h3").textContent}`;w()}W.forEach((I,A)=>{I.addEventListener("click",(C)=>{if(G!==A)C.preventDefault(),y(A)}),I.addEventListener("focus",()=>{if(I.matches(":focus-visible"))y(A)})}),K.addEventListener("click",(I)=>{let A=I.target.closest("button[data-step]");if(A)y(G+Number(A.dataset.step))}),J.addEventListener("keydown",(I)=>{if(!["ArrowLeft","ArrowRight"].includes(I.key))return;if(!I.target.closest(".hero-poster, .hero-controls"))return;if(I.preventDefault(),y(G+(I.key==="ArrowRight"?1:-1)),I.target.closest(".hero-poster"))W[G].focus({preventScroll:!0})}),X.addEventListener("click",()=>{if(L=!L,L)z=D=!1;w()}),J.addEventListener("pointerenter",(I)=>{if(I.pointerType!=="mouse")return;z=!0,w()}),J.addEventListener("pointerleave",()=>{z=!1,w()}),J.addEventListener("focusin",(I)=>{if(I.target===X)return;D=!0,w()}),J.addEventListener("focusout",(I)=>{if(J.contains(I.relatedTarget))return;D=!1,w()}),U.addEventListener("visibilitychange",w),K.hidden=!1,y(G,!1);function V(I,A){$.style.setProperty("--view-x",`${I*3}deg`),$.style.setProperty("--view-y",`${-A*2}deg`),F?.move(I,A)}$.addEventListener("pointermove",(I)=>{if(E.matches||!q.matches||I.pointerType!=="mouse")return;let A=$.getBoundingClientRect();V((I.clientX-A.left)/A.width*2-1,(I.clientY-A.top)/A.height*2-1)}),$.addEventListener("pointerleave",()=>V(0,0)),E.addEventListener("change",()=>{if(V(0,0),E.matches)L=!1;w()}),F=Q($)}function $G(J){let Q=J.querySelector("canvas"),$;try{$=new iQ({canvas:Q,alpha:!0,antialias:!0,powerPreference:"low-power"})}catch(G){Q.hidden=!0,console.warn("Decorative 3D scene unavailable; event content remains accessible.",G);return}let W=new I6,Z=new AJ(35,1,0.1,30);Z.position.set(0,0.6,10),Z.lookAt(0,0,0);let K=new I8;W.add(K);let H=new P6({color:13156302,metalness:0.72,roughness:0.26}),Y=new jJ(new F9(3.7,0.045,12,160),H);Y.rotation.set(1.12,0.12,-0.16),K.add(Y);let X=new jJ(new F9(4.05,0.012,8,160),H);X.rotation.set(1.25,-0.2,0.13),K.add(X),W.add(new v6(13946079,1.2));for(let[G,F,L,z,D]of[[16777215,4,0,3,5],[16721567,8,-4,0,2],[1301503,8,4,1,2]]){let N=new y6(G,F);N.position.set(L,z,D),W.add(N)}let U=0;function E(){if(U||Q.hidden||document.hidden)return;U=requestAnimationFrame(()=>{U=0,$.render(W,Z)})}function q(){let{clientWidth:G,clientHeight:F}=J;$.setPixelRatio(Math.min(devicePixelRatio,1.5)),$.setSize(G,F,!1),Z.aspect=G/F,Z.position.z=G<700?16:10,Z.updateProjectionMatrix(),E()}return new ResizeObserver(q).observe(J),document.addEventListener("visibilitychange",E),Q.addEventListener("webglcontextlost",(G)=>{G.preventDefault(),Q.hidden=!0}),Q.addEventListener("webglcontextrestored",()=>{Q.hidden=!1,q()}),q(),{move(G,F){K.rotation.set(F*0.07,G*0.09,-G*0.025),E()}}}if(typeof document<"u")RZ(document.getElementById("spotlight"));})();
