const memberStr = `
github 链接
线下组team1	
炒米	https://github.com/FZelin/zkshanghai-workshop 
浩葛格	https://github.com/ZKPeddie/zkshanghai-workshop
pu	https://github.com/shipunyc/zkshanghai-workshop
奶哥	https://github.com/sennmac/zkshanghai-workshop
claudable	https://github.com/ClaudeZsb/zkshanghai-workshop
	
线下组team2	
寒非	
孙登辉	
HCeth	https://github.com/DolphinMiner/zkshanghai-workshop
大漠小飞鹰	
	
线下组team3	
KK	https://github.com/0xKKv7/zkshanghai-workshop
ther	https://github.com/ther0908/zkshanghai-workshop
小吖么一朗	
wayne	
李月	
	
线上组team4	
Yuhan Zhang	
jack	
Jinxin Hu	https://github.com/hujinxinchengdu/zkshanghai-workshop
luc5	https://github.com/Lucshine/zkshanghai-workshop
郭英杰	https://github.com/GalaIO/zkshanghai-workshop
siy	
tt	https://github.com/TT-Wang/zkshanghai-workshop
叶大伟	https://github.com/nifengttz/zkshanghai-workshop
	
线上组team5	
1984	
林庚	
石越	
walker	https://github.com/Pupil1999/zkshanghai-workshop
cy	https://github.com/chrisyy2003/zkshanghai-workshop
0xShakesBeare	
maymay	
joly	
	
	
线上组team6	
国服梅西	https://github.com/ZHIDALUO/zkshanghai-workshop
Lance	 https://github.com/yangfan100/zkshanghai-workshop
千阳	https://github.com/bufrr/zkshanghai-workshop
今晚打老虎	 https://github.com/OxfordStreet/zkshanghai-workshop
李百策	https://github.com/libaice/zkshanghai-workshop
garen woo v1.8	https://github.com/GarenWoo/zkshanghai-workshop
zyp	https://github.com/breeze2501/zkshanghai-workshop
予算	 https://github.com/YUsuan1213/zkshanghai-workshop
	
线上组team7	
liberty Ma	
jude	https://github.com/QlDoors/zkshanghai-workshop 
皮卡	https://github.com/wenjin1997/zkshanghai-workshop
lysiane	
lansane	
净	
DravenLu	https://github.com/Dispa1r/zkshanghai-workshop
Akagi201	https://github.com/Akagi201/zkp-workshop
	
线上组team8	
老九	https://github.com/lane2/zkshanghai-workshop
0x13600702	https://github.com/txgyy/zkshanghai-workshop
bw	
xyh	
CJ	
Li Smith	https://github.com/baidang201/zkcourse-homework
Jys	https://github.com/YashuoKim/zkshanghai-workshop
mrtree	https://github.com/mrttree/zkcourse-homework
	
线上组team9	
月黑风高	https://github.com/NightOnDark/zkshanghai-workshop
冯胜	https://github.com/fsheng81/zkcourse-homework-fsheng
张彭龙	 https://github.com/zhangdaozhu/zkcourse-homework
li cong	https://github.com/congli35/zkcourse-homework
meepo lipeng	
Dazsao	https://github.com/DessertHeart/zkshanghai-workshop
Jackie	https://github.com/Jackietan99/zkcourse-homework
keep	https://github.com/readygo67/zkshanghai-workshop
	
线上组team10	
azleal	https://github.com/Azleal/zkshanghai-workshop
烛畔鬓云	https://github.com/danielsonggit/danielsonggit.github.io
John wein	https://github.com/zliu265/zkshanghai-workshop
黄骞	https://github.com/huangqian1985/zkshanghai-workshop
SinTan	https://github.com/sintan1071/zkshanghai-workshop
杨关旬	https://github.com/yangguanxun/zkshanghai-workshop
A123	https://github.com/dcbd2e4038/zkshanghai-workshop
虎	
	
线上组team11	
白菜	
Anonymous	
17	
梭哈艺术家	
click	
gss	
kael	
demian德米安	https://github.com/Demian101/zkshanghai-workshop/
	
线上组team12	
shane	
鱼丸	
kp	
diego	
rectinajh	https://github.com/rectinajh/zkshanghai-workshop
one	https://github.com/micr0ne/zkshanghai-workshop
`;

const members = memberStr
  .split("\n")
  .filter((_) => _.trim())
  .map((_) => _.split("\t").map((_) => _.trim()))
  .filter((_) => _.length == 2 && _[1].startsWith("https://github.com/"))
  .map((_) => ({ name: _[0].replace(/ /g, "_").replace(/\./g, "_"), github: _[1] }));

export default {
  load() {
    return {
      data: members,
    };
  },
};
