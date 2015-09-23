var cwidth = 1000;           
	var cheight = 600;         
	var ctx;                  
	var canvas1;             
	var dx;               
	var dy;                   
	var col1 = 60;
	var row1 = 30;
	var partsy = 60
	var colwidth = 100;
	var colheight = 60;
	var partsheight = 40;
	var partswidth = 40;
	var partspiles = [];
	var boardpiles = [];
	var gatetable =[];
	var lines = [];
	var coltable = [];
	var uparray = [];
	var dwnarray =  [];
	var newlist = [];
	var currentlist = [];
	
	
	                             // save circuit array
								 
	//   0 "sc1" circuit id       10 output 2 (elementno)          20 input # at dest for output 2
	//   1 input 1 (elementno)    11 output 2                      21 input # at dest for output 2
	//   2 input 2                12 output 2                      22 savxcood
	//   3 input 3                13 output 2                      23 savycood
	//   4 input 4                14 input # at dest for output 1  24 elementno
	//   5 input 5                15 input # at dest for output 1  25 savb1
	//   6 output 1 (elementno)   16 input # at dest for output 1  26 savb2
	//   7 output 1               17 input # at dest for output 1
	//   8 output 1               18 input # at dest for output 2
	//   9 output 1               19 input # at dest for output 2
	
	var savecircuit1 = [["sc1",-1,-1,-1,-1,-1,87,86,85,84,-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1,60,90,23,0,1],
					    ["sc1",-1,-1,-1,-1,-1,87,86,85,84,-1,-1,-1,-1,3,3,3,3,-1,-1,-1,-1,60,270,92,0,4],
						["sc1",-1,-1,-1,-1,-1,87,86,85,84,-1,-1,-1,-1,5,5,5,5,-1,-1,-1,-1,60,510,22,0,8],
						["sc1",-1,-1,-1,-1,-1,87,87,-1,-1,-1,-1,-1,-1,2,4,5,5,-1,-1,-1,-1,160,150,21,1,2],
						["sc1",23,21,92,21,22,91,7,86,86,-1,-1,-1,-1,1,1,2,4,-1,-1,-1,-1,260,210,87,2,3],
						["sc1",23,87,92,87,22,7,91,-1,-1,-1,-1,-1,-1,2,2,2,4,-1,-1,-1,-1,360,270,86,3,4],
						["sc1",87,86,-1,-1,-1,85,85,6,-1,-1,-1,-1,-1,2,4,2,4,-1,-1,-1,-1,460,210,7,4,3],
						["sc1",23,7,92,7,22,91,6,-1,-1,-1,-1,-1,-1,3,1,2,4,-1,-1,-1,-1,560,330,85,5,5],
						["sc1",85,7,-1,-1,-1,84,84,-1,-1,-1,-1,-1,-1,2,4,2,4,-1,-1,-1,-1,660,390,6,6,6],
						["sc1",87,86,85,84,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,4,2,4,-1,-1,-1,-1,860,90,91,8,1],
						["sc1",23,6,92,6,22,91,-1,-1,-1,-1,-1,-1,-1,4,4,2,4,-1,-1,-1,-1,760,450,84,7,7],
						["sc2",-1,-1,-1,-1,-1,91,39,7,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,60,150,23,0,2],
						["sc2",-1,-1,-1,-1,-1,91,15,6,-1,-1,-1,-1,-1,2,1,2,-1,-1,-1,-1,-1,60,270,22,0,4],
						["sc2",-1,-1,-1,-1,-1,91,38,15,-1,-1,-1,-1,-1,3,1,2,-1,-1,-1,-1,-1,60,390,21,0,6],
						["sc2",23,-1,-1,-1,-1,6,-1,-1,-1,-1,-1,-1,-1,1,1,2,-1,-1,-1,-1,-1,160,150,39,1,2],
						["sc2",21,-1,-1,-1,-1,5,-1,-1,-1,-1,-1,-1,-1,2,1,2,-1,-1,-1,-1,-1,160,390,38,1,6],
						["sc2",22,21,-1,-1,-1,7,-1,-1,-1,-1,-1,-1,-1,2,1,2,-1,-1,-1,-1,-1,260,270,15,2,4],
						["sc2",23,15,-1,-1,-1,14,-1,-1,-1,-1,-1,-1,-1,1,1,2,-1,-1,-1,-1,-1,360,210,7,3,3],
						["sc2",39,22,-1,-1,-1,5,-1,-1,-1,-1,-1,-1,-1,1,1,2,-1,-1,-1,-1,-1,360,330,6,3,5],
						["sc2",6,38,-1,-1,-1,14,-1,-1,-1,-1,-1,-1,-1,2,1,2,-1,-1,-1,-1,-1,460,390,5,4,6],
						["sc2",7,5,-1,-1,-1,31,-1,-1,-1,-1,-1,-1,-1,1,1,2,-1,-1,-1,-1,-1,560,270,14,5,4],
						["sc2",23,22,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,-1,-1,-1,-1,-1,660,90,91,6,1],
						["sc2",14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,-1,-1,-1,-1,-1,660,150,31,6,2],
						["sc3",-1,-1,-1,-1,-1,79,78,77,76,-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1,160,90,21,1,1],
						["sc3",-1,-1,-1,-1,-1,79,78,77,76,-1,-1,-1,-1,4,4,4,4,-1,-1,-1,-1,160,150,23,1,2],
						["sc3",-1,-1,-1,-1,-1,79,-1,-1,-1,-1,-1,-1,-1,2,4,4,4,-1,-1,-1,-1,160,210,22,1,3],
						["sc3",-1,-1,-1,-1,-1,79,78,77,76,-1,-1,-1,-1,3,3,3,3,-1,-1,-1,-1,160,330,20,1,5],
						["sc3",21,22,20,23,-1,78,31,-1,-1,-1,-1,-1,-1,2,1,3,3,-1,-1,-1,-1,360,210,79,3,3],
						["sc3",21,79,20,23,-1,77,30,-1,-1,-1,-1,-1,-1,2,1,3,3,-1,-1,-1,-1,360,270,78,3,4],
						["sc3",21,78,20,23,-1,76,29,-1,-1,-1,-1,-1,-1,2,1,3,3,-1,-1,-1,-1,360,330,77,3,5],
						["sc3",21,77,20,23,-1,28,-1,-1,-1,-1,-1,-1,-1,1,1,3,3,-1,-1,-1,-1,360,390,76,3,6],
						["sc3",79,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,3,3,-1,-1,-1,-1,560,210,31,5,3],
						["sc3",78,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,3,3,-1,-1,-1,-1,560,270,30,5,4],
						["sc3",77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,3,3,-1,-1,-1,-1,560,330,29,5,5],
						["sc3",76,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,3,3,-1,-1,-1,-1,560,390,28,5,6],
						["sc4",-1,-1,-1,-1,-1,47,38,-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,160,90,23,1,1],
						["sc4",-1,-1,-1,-1,-1,46,39,-1,-1,-1,-1,-1,-1,2,1,1,-1,-1,-1,-1,-1,160,330,22,1,5],
						["sc4",22,-1,-1,-1,-1,47,-1,-1,-1,-1,-1,-1,-1,2,1,1,-1,-1,-1,-1,-1,260,150,39,2,2],
						["sc4",23,-1,-1,-1,-1,46,-1,-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,260,270,38,2,4],
						["sc4",23,39,-1,-1,-1,45,-1,-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,360,90,47,3,1],
						["sc4",38,22,-1,-1,-1,45,-1,-1,-1,-1,-1,-1,-1,2,1,1,-1,-1,-1,-1,-1,360,330,46,3,5],
						["sc4",47,46,-1,-1,-1,31,-1,-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,460,210,45,4,3],
						["sc4",45,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,560,210,31,5,3],
						["sc5",-1,-1,-1,-1,-1,54,-1,-1,-1,-1,-1,-1,-1,2,2,-1,-1,-1,-1,-1,-1,260,150,23,2,2],
						["sc5",-1,-1,-1,-1,-1,55,-1,-1,-1,-1,-1,-1,-1,1,2,-1,-1,-1,-1,-1,-1,260,270,22,2,4],
						["sc5",22,54,-1,-1,-1,54,31,-1,-1,-1,-1,-1,-1,1,1,-1,-1,-1,-1,-1,-1,360,150,55,3,2],
						["sc5",55,23,-1,-1,-1,55,30,-1,-1,-1,-1,-1,-1,2,1,-1,-1,-1,-1,-1,-1,360,270,54,3,4],
						["sc5",55,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,-1,-1,-1,-1,-1,-1,560,150,31,5,2],
						["sc5",54,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,-1,-1,-1,-1,-1,-1,560,270,30,5,4],
						["sc6",-1,-1,-1,-1,-1,91,61,44,-1,-1,-1,-1,-1,2,2,2,-1,-1,-1,-1,-1,60,150,23,0,2],
						["sc6",-1,-1,-1,-1,-1,63,46,91,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,160,150,22,1,2],
						["sc6",22,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,260,90,91,2,1],
						["sc6",-1,-1,-1,-1,-1,47,62,90,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,260,150,21,2,2],
						["sc6",21,63,-1,-1,-1,45,-1,-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,260,210,47,2,3],
						["sc6",22,19,-1,-1,-1,62,47,-1,-1,-1,-1,-1,-1,2,2,1,-1,-1,-1,-1,-1,260,270,63,2,4],
						["sc6",22,19,-1,-1,-1,45,-1,-1,-1,-1,-1,-1,-1,2,2,1,-1,-1,-1,-1,-1,260,330,46,2,5],
						["sc6",21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,1,-1,-1,-1,-1,-1,360,90,90,3,1],
						["sc6",47,46,-1,-1,-1,43,60,-1,-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1,360,270,45,3,4],
						["sc6",-1,-1,-1,-1,-1,89,61,44,-1,-1,-1,-1,-1,2,1,1,-1,-1,-1,-1,-1,460,150,20,4,2],
						["sc6",-1,-1,-1,-1,-1,46,63,89,-1,-1,-1,-1,-1,2,2,1,-1,-1,-1,-1,-1,560,150,19,5,2],
						["sc6",20,23,-1,-1,-1,60,43,-1,-1,-1,-1,-1,-1,2,2,1,-1,-1,-1,-1,-1,560,390,61,5,6],
						["sc6",20,23,-1,-1,-1,42,-1,-1,-1,-1,-1,-1,-1,2,2,1,-1,-1,-1,-1,-1,560,450,44,5,7],
						["sc6",19,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,1,-1,-1,-1,-1,-1,660,90,89,6,1],
						["sc6",45,61,-1,-1,-1,42,-1,-1,-1,-1,-1,-1,-1,1,2,1,-1,-1,-1,-1,-1,660,270,43,6,4],
						["sc6",21,63,-1,-1,-1,88,-1,-1,-1,-1,-1,-1,-1,1,2,1,-1,-1,-1,-1,-1,760,210,62,7,3],
						["sc6",45,61,-1,-1,-1,88,-1,-1,-1,-1,-1,-1,-1,2,2,1,-1,-1,-1,-1,-1,760,330,60,7,5],
						["sc6",43,44,-1,-1,-1,88,-1,-1,-1,-1,-1,-1,-1,3,2,1,-1,-1,-1,-1,-1,760,390,42,7,6],
						["sc6",62,60,42,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,1,-1,-1,-1,-1,-1,860,90,88,8,1],
					    ];
	var disarray = [dis0,dis1];
	
	var mousex;
	var mousey;
	var gotit;
	
	var inmotion = false;	
	var elements = Array(65);                                      
	var savex;
	var savey;
	var savem;
	var ppileno;
	var elementno; 
	var workelement;
	var wkelement;
	var holdtype;
	var workimage;
	var holdimage1;
	var holdimage2;
	var workstashy;
	var workpile;
	var distot;
	var timevent;
	
	var	partsstashx = 5;
	
	var instashy = 60;
	var inpile = 0;
	
	var outstashy = 100;
	var outpile = 1;
	
	var andstashy =140;
	var andpile = 2;
	
	var orstashy = 180;
	var orpile = 3;
	
	var notstashy = 220;
	var notpile = 4;
	
	var nandstashy = 260;
	var nandpile = 5;
	
	var norstashy = 300;
	var norpile = 6;
	
	var xorstashy = 340;
	var xorpile = 7;
	
	var bufstashy = 380;
	var bufpile = 8;
	
	var dffstashy = 425;
	var dffpile = 9;
	
	var jkffstashy = 470;
	var jkffpile = 10;
	
	var disstashy = 510;
	var dispile = 11;
	
	var ossstashy = 550;
	var osspile = 12;
	
	
	var lineflag;
	var fromflag;                     //  1=> from parts piles    2=>  from the board
	var modeswitch;    // 0 => nothing happening , 1 => moving element , 2 => connect mode
	var savb1;
	var savb2;
	var savxcood;
	var savycood;
	var savem;
	var savej;
	var useline;
	var connectno;
	var workconnect;
	var hookupflag;
	var inputno;
	var inputadj;
	var xadjust;
	var outputno;
	var outadj;
	var outid;
	var checkflag;
	var backflag;
	
	var imgname;                       
	var elementindex;                      
	var elementtype;                  
	var elementflag;                       
	var selement           // the source element for connection
	var delement           // the destination element
	var startlinex      // the x coordinate of the beginning of the out line
	var startliney      // the y coordinate of the beginning of the out line
	var endlinex        // the x coordinate of the end of the out line
	var endliney        // the y coordinate of the end of the out line
	var collinex;
	var onoff;     // 0 => off    1 => on
	var signal;
	
	
	var mousex;
	var mousey;
	var gotit;
	var cmflag;
	var message = "";
	var mess1 = "";
	var mess2 = "";
	var mess3 = "";
	var mess4 = "";
	var messa;
	var messb;
	var toflag;
	var aceflag;
	var p1flag;
	var pilesflag;
	var card1;
	var card2;
	var dwork;
	var swork;
	var ckflag;
	var savei;
	var kingflag;
	var pilecnt;
	var savepileno;
	var wz1;
	var wz2;
	var ossflag = 0;
	var ossno;
	var sgelement;
	var savindex;
	var mcount;
	var jcount;
	var kcount;
	var teststuff;
	var counter;
	var cirflag;
	var cirbuttx = 140;
	var cirbutty = 5;
	var cirbuttlen = 110 ;
	var clrflag;
	var clrbuttx = 50;
	var clrbutty = 5;
	var clrbuttlen = 90 ;
	var helpflag;
	var helpflag2;
	var helpbuttx = 10;
	var helpbutty = 5;
	var helpbuttlen = 40 ;
	var savflag;
	var savbuttx = 710;
	var savbutty = 5;
	var savbuttlen = 90 ;
	var getflag;
	var getbuttx = 800;
	var getbutty = 5;
	var getbuttlen = 90 ;
	var delflag;
	var delbuttx = 890;
	var delbutty = 5;
	var delbuttlen = 100 ;
	var theheader;
	var message1;
	var message1x;
	var message1y;
	var message2;
	var message2x;
	var message2y;
	var message3;
	var message3x;
	var message3y;
	var message4;
	var message4x;
	var message4y;
	var message5;
	var message5x;
	var message5y;
	var message6;
	var message6x;
	var message6y;
	var helpon
	var helpx = 575;
	var helpy = 150;
	var samplecounter = 0;
	var sampleid;
	var storeit = [];
	var recno;
	var keycounter;
	var cirname;
	var key;
	var hold = [];
	var workcircuit = [];
	var savedarray = [];
	var savecounter = 0;
	var sflag;
	var xflag;
	var displayflag;
	
	//                             THE GATE TABLE        gatetable =[elementno][0-35]
	//
	//  0 = state of element          11 = output 2                    22 = input 3 connection no      33 = state of the clock (flip flop)      
	//  1 = input 1 (element no)      12 = output 2                    23 = input 4 connection no      34 = state of the preset (flip flop)
	//  2 = input 2                   13 = output 2                    24 = input 5 connection no      35 = state of the clear (flip flop)
	//  3 = input 3                   14 = not in use                  25 = output1 connection no
	//  4 = input 4                   15 = input 1 state               26 = output1 connection no
	//  5 = input 5                   16 = input 2 state               27 = output1 connection no
	//  6 = output 1 (element no)     17 = input 3 state               28 = output1 connection no
	//  7 = output 1                  18 = input 4 state			   29 = output2 connection no
	//  8 = output 1                  19 = input 5 state               30 = output2 connection no
	//  9 = output 1                  20 = input 1 connection no       31 = output2 connection no
	// 10 = output 2                  21 = input 2 connection no       32 = output2 connection no
	
	var andoff = new Image();
	andoff.src = "and_off.png";
	var andon = new Image();
	andon.src = "and_on.png";
	
	var nandoff = new Image();
	nandoff.src = "nand_off.png";
	var nandon = new Image();
	nandon.src = "nand_on.png";
	
	var oroff = new Image();
	oroff.src = "or_off.png";
	var oron = new Image();
	oron.src = "or_on.png";
	
	var noroff = new Image();
	noroff.src = "nor_off.png";
	var noron = new Image();
	noron.src = "nor_on.png";
	
	var notoff = new Image();
	notoff.src = "not_off.png";
	var noton = new Image();
	noton.src = "not_on.png";
	
	var xoroff = new Image();
	xoroff.src = "xor_off.png";
	var xoron = new Image();
	xoron.src = "xor_on.png";
	
	var bufoff = new Image();
	bufoff.src = "buf_off.png";
	var bufon = new Image();
	bufon.src = "buf_on.png";
	
	var inoff = new Image();
	inoff.src = "in_off.png";
	var inon = new Image();
	inon.src = "in_on.png";
	
	var outoff = new Image();
	outoff.src = "out_off.png";
	var outon = new Image();
	outon.src = "out_on.png";
	
	var dffoff = new Image();
	dffoff.src = "dff_off.png";
	var dffon = new Image();
	dffon.src = "dff_on.png";
	
	var jkffoff = new Image();
	jkffoff.src = "jkff_off.png";
	var jkffon = new Image();
	jkffon.src = "jkff_on.png";
	
	var ossoffup = new Image();
	ossoffup.src = "oss_off_up.png";
	var ossoffdown = new Image();
	ossoffdown.src = "oss_off_down.png";
	var ossondown = new Image();
	ossondown.src = "oss_on_down.png";
	
	var dis0 = new Image();
	dis0.src = "dis_0.png";
	var dis1 = new Image();
	dis1.src = "dis_1.png";
	var dis2 = new Image();
	dis2.src = "dis_2.png";
	var dis3 = new Image();
	dis3.src = "dis_3.png";
	var dis4 = new Image();
	dis4.src = "dis_4.png";
	var dis5 = new Image();
	dis5.src = "dis_5.png";
	var dis6 = new Image();
	dis6.src = "dis_6.png";
	var dis7 = new Image();
	dis7.src = "dis_7.png";
	var dis8 = new Image();
	dis8.src = "dis_8.png";
	var dis9 = new Image();
	dis9.src = "dis_9.png";
	var dis10 = new Image();
	dis10.src = "dis_10.png";
	var dis11 = new Image();
	dis11.src = "dis_11.png";
	var dis12 = new Image();
	dis12.src = "dis_12.png";
	var dis13 = new Image();
	dis13.src = "dis_13.png";
	var dis14 = new Image();
	dis14.src = "dis_14.png";
	var dis15 = new Image();
	dis15.src = "dis_15.png";
	
function TheElement (sx,sy,swidth,sheight,imga,cnumber,cname,cflag) {
	this.sx = sx;
	this.sy = sy;
	this.img = imga;
	this.swidth = 32;
	this.sheight = 32;
	this.num = cnumber;
	this.type = cname;
	this.upflag = cflag;                 
	this.draw = drawAnImage;
}
function drawAnImage() {
	ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight);
}
function makepartspiles() {           // make a 2 dimensional array for the parts piles
	for (i=0;i<13;i++) {
	partspiles[i] = [];
	}
}
function makeboardpiles() {           // make a 2 dimensional array for the board piles
	for (i=0;i<10;i++) {
	boardpiles[i] = [];
	}
}
function makegatetable() {           // make a 2 dimensional array for the element info
	for (i=0;i<100;i++) {
	gatetable[i] = [];
	}
}
//function makesavecircuit1() {           // make a 2 dimensional array for the example circuit
//	for (i=0;i<100;i++) {
//	gatetable[i] = [];
//	}
//}
function makelines() {           // make a 2 dimensional array to keep track of the lines
	for (i=0;i<100;i++) {
	lines[i] = [];
	}
}
function makecoltable() {           // make a 2 dimensional array to keep track what's in the columns
	for (i=0;i<10;i++) {
	coltable[i] = [];
	}
}
 function setup1() {    
	for (i=0;i<10;i++) {            //initialize the board piles array
		for (j=0;j<10;j++) {
			boardpiles[i][j] = -1;
		}
	}
	for (i=0;i<100;i++) {            //initialize the gate table
		for (j=0;j<40;j++) {
			gatetable[i][j] = -1;
		}
		for(j=15;j<20;j++) {
			gatetable[i][j] = 0;    // set the initial inputs to 0
		}
	}
	for (i=0;i<100;i++) {           // initialize the lines array
		lines [i][0] = -1;
	}
	for (i=0;i<10;i++) {           // initialize the columns array
		for (j=0;j<10;j++) {
			coltable[i][j] = -1;
		}
	}
}
function setup2() { 
	for (i=0;i<8;i++) {             //  'and' parts pile
		workx = partsstashx;
		worky = andstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[andpile].push(i);
	}
	for (i=8;i<16;i++) {              // 'or' parts pile
		workx = partsstashx;
		worky = orstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[orpile].push(i);
	}
	for (i=16;i<24;i++) {              // 'in' parts pile
		workx = partsstashx;
		worky = instashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[inpile].push(i);
	}
	for (i=24;i<32;i++) {              // 'out' parts pile
		workx = partsstashx;
		worky = outstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[outpile].push(i);
	}
	for (i=32;i<40;i++) {              // 'not' parts pile
		workx = partsstashx;
		worky = notstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[notpile].push(i);
	}
	for (i=40;i<48;i++) {              // 'nand' parts pile
		workx = partsstashx;
		worky = nandstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[nandpile].push(i);
	}
	for (i=48;i<56;i++) {              // 'nor' parts pile
		workx = partsstashx;
		worky = norstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[norpile].push(i);
	}
	for (i=56;i<64;i++) {              // 'xor' parts pile
		workx = partsstashx;
		worky = xorstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[xorpile].push(i);
	}
	for (i=64;i<72;i++) {              // 'buf' parts pile
		workx = partsstashx;
		worky = bufstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[bufpile].push(i);
	}
	for (i=72;i<80;i++) {              // 'dff' parts pile
		workx = partsstashx;
		worky = dffstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[dffpile].push(i);
	}
	for (i=80;i<88;i++) {              // 'jkff' parts pile
		workx = partsstashx;
		worky = jkffstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[jkffpile].push(i);
	}
	for (i=88;i<92;i++) {              // 'dis' parts pile
		workx = partsstashx;
		worky = disstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[dispile].push(i);
	}
	for (i=92;i<93;i++) {              // 'oss' parts pile
		workx = partsstashx;
		worky = ossstashy;
		elements[i].sx = workx;
		elements[i].sy = worky;
		partspiles[osspile].push(i);
		
		clearInterval(timevent);            // turn off signal generator
	}
	modeswitch = 0;
}
//......................................................................................................................
// This function is called onload.
// It sets up ctx context for drawing and canvas1 events. 
// It sets up the event listeners for mousedown, mousemove, and mouseup, click, and  double click

function init(){

	ctx = document.getElementById('canvas').getContext('2d');
	canvas1 = document.getElementById('canvas');
	canvas1.addEventListener('mousedown',findelement,false);
	canvas1.addEventListener('mousemove',moveit,false);
	canvas1.addEventListener('mouseup',finish,false); 
	canvas1.addEventListener('dblclick',startconnect,false);
	canvas1.addEventListener('click',finishconnect,false); 
	
	makepartspiles();     // construct the 2 dimensional arrays
	makeboardpiles();
	makegatetable();
	makelines();
	makecoltable();
	setup1();
	theheader = "Digital Logic Breadboard";
	message1 = "";
	message2 = "";
	message3 = "";
	message4 = "";
	message5 = "";
	message6 = "";
	
	for (i=0;i<8;i++) {                // create the 'and' objects
		imgname = andoff;
		elementtype = "and";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	
	for (i=8;i<16;i++) {                // create the 'or' objects
		imgname = oroff;
		elementtype = "or";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=16;i<24;i++) {                // create the 'in' objects
		imgname = inoff;
		elementtype = "in";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
		gatetable[i][0] = 0;              // set the state to off
	}
	for (i=24;i<32;i++) {                // create the 'out' objects
		imgname = outoff;
		elementtype = "out";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=32;i<40;i++) {                // create the 'not' objects
		imgname = notoff;
		elementtype = "not";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=40;i<48;i++) {                // create the 'nand' objects
		imgname = nandoff;
		elementtype = "nand";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=48;i<56;i++) {                // create the 'nor' objects
		imgname = noroff;
		elementtype = "nor";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=56;i<64;i++) {                // create the 'xor' objects
		imgname = xoroff;
		elementtype = "xor";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=64;i<72;i++) {                // create the 'buf' objects
		imgname = bufoff;
		elementtype = "buf";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=72;i<80;i++) {                // create the 'dff' objects
		imgname = dffoff;
		elementtype = "dff";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=80;i<88;i++) {                // create the 'jkff' objects
		imgname = jkffoff;
		elementtype = "jkff";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=88;i<92;i++) {                // create the 'dis' object
		imgname = dis0;
		elementtype = "dis";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	for (i=92;i<93;i++) {                // create the 'oss' object
		imgname = ossoffup;
		elementtype = "oss";           
		elementindex = i;
		elementflag = 0;
		elements[i] = new TheElement(100,120,32,32,imgname,elementindex,elementtype,elementflag);
	}
	setup2();
	//testit();
	drawall();
}
//............................................................................................................. 
//       this section deals with the mouse events
//

function findelement(ev) {                                          // mouse down event
	var mx;
	var my;
	/*if ( ev.layerX ||  ev.layerX == 0) { // Firefox, Chrome
	
   			mx= ev.layerX;
    		my = ev.layerY;
  		} else if (ev.offsetX || ev.offsetX == 0) { // Opera,
		
    		mx = ev.offsetX;
    		my = ev.offsetY;
  		}
	*/
	
	if(ev.layerX>=ev.offsetX){
		mx = ev.offsetX;
		my = ev.offsetY;
	}
	else {
		mx = ev.layerX;
		my = ev.layerY;
	}
	//mx = ev.offsetX;
    //my = ev.offsetY;	
	mousex = mx;
	mousey = my;
	//helpon = 0;

	if (modeswitch != 0) {                 //get out, we are in the middle of something else
		return
	}
	checkstart();
	
	if(gotit == 1) {                       //mouse is down on an element          
		if (fromflag == 2) {          // if it is an element on the board rather than from the parts piles
		
			elementno = boardpiles[savb1][savb2];			// 
		showit();
		//saveit();
		
		
			hookupflag = 0                            // check to see if this element is connected to something
			for (i=1;i<15;i++) {                        
				if (gatetable[elementno][i] != -1) {        //  whoops , this element is connected to something
					hookupflag = 1;
				}
			}
			if(elements[elementno].type == "in") {    // is this an input switch ?	
				if(hookupflag == 1) {                      // yes, if it is connected to something, and
					if (mousex < savxcood+30) {            // if it's not in the 'output' zone
					togglesw();                      // toggle the switch and run the pulse
					return;
					}
				}
			}
			if(elements[elementno].type == "oss") {    // is this the signal generator ?
				if(hookupflag == 1) {                      // yes, if it is connected to something,
					checksgbutton();                    // deal with it
					return;
				}
				else{
					clearInterval(timevent);            // turn off the timer
					ossno = 1;                         // get off up image
					workimage = elements[elementno].type;
					wkelement = elementno;
					getimage();	                       ///
				}
			}
			if(hookupflag != 1) {              // not connected to anything, ok to move it
				workimage = elements[elementno].type;
				onoff = 0;                   // turn the element off if moving
				wkelement = elementno;
				getimage();	                       /////////////////// 																				
				boardpiles[savb1][savb2] = -1;              // take it off the bread board
				for(i=0;i<10;i++) {                         // remove it from the column table
					if(coltable[savb1][i] == elementno) {
						coltable[savb1][i] = -1;
					}
				}
				for(i=0;i<10;i++) {                         // looking for inverse outputs on flip flops
					if(coltable[savb1][i] == elementno*100) {      // in the column table
						coltable[savb1][i] = -1;
					}
					
				}
			}
		}
		if(fromflag==1) {              // taking from the parts pile
			hookupflag = 0;
		}
		setmode(); 
		if (modeswitch == 1) {
			inmotion = true;
			dx = mx - elements[elementno].sx;
			dy = my - elements[elementno].sy;
			savex = elements[elementno].sx;
			savey = elements[elementno].sy;
			modeswitch = 0;
		}
	}
}
//.......................................................................................................................
// dragging an element                              // mouse move event

function moveit(ev) {
	var mx;
	var my;
		
	/*if ( ev.layerX ||  ev.layerX == 0) { // Firefox, Chrome
	
   			mx= ev.layerX;
    		my = ev.layerY;
  		} else if (ev.offsetX || ev.offsetX == 0) { // Opera,
		
    		mx = ev.offsetX;
    		my = ev.offsetY;
  		}
		*/
	if(ev.layerX>=ev.offsetX){
		mx = ev.offsetX;
		my = ev.offsetY;
	}
	else {
		mx = ev.layerX;
		my = ev.layerY;
	}
	
	mousex = mx;
	mousey = my;
	
	if (modeswitch == 2) {
		lineflag = 1;
		drawall();
		return;
	}
	if (inmotion) {	
		if(hookupflag == 1) {             // this element is connected to something, can't move it.
			return;
		}
		elements[elementno].sx = mx - dx;
		elements[elementno].sy = (my - dy);
		drawall();
	}
	//  check the buttons
	
	if(((mx>cirbuttx)&(mx<cirbuttx+cirbuttlen))&((my>cirbutty-4)&(my<cirbutty+20))) {     // sample circuit button
		cirflag=1;
		drawall();
	}
	else{
		cirflag = 0;
		drawall();
	}
	
	if(((mx>clrbuttx)&(mx<clrbuttx+cirbuttlen))&((my>clrbutty-4)&(my<clrbutty+20))) {     // clear circuit button
		clrflag=1;
		drawall();
	}
	else{
		clrflag = 0;
		drawall();
	}
	
	if(((mx>savbuttx)&(mx<savbuttx+savbuttlen))&((my>savbutty-4)&(my<savbutty+20))) {     // save circuit button
		savflag=1;
		drawall();
	}
	else{
		savflag = 0;
		drawall();
	}
	
	if(((mx>getbuttx)&(mx<getbuttx+getbuttlen))&((my>getbutty-4)&(my<getbutty+20))) {     // get circuit button
		getflag=1;
		drawall();
	}
	else{
		getflag = 0;
		drawall();
	}
	if(((mx>delbuttx)&(mx<delbuttx+delbuttlen))&((my>delbutty-4)&(my<delbutty+20))) {     // delete circuit button
		delflag=1;
		drawall();
	}
	else{
		delflag = 0;
		drawall();
	}
	
	if(((mx>clrbuttx)&(mx<clrbuttx+clrbuttlen))&((my>clrbutty-4)&(my<clrbutty+20))) {     // clear circuit button
		clrflag=1;
		drawall();
	}
	else{
		clrflag = 0;
		drawall();
	}
	
	if(((mx>helpbuttx)&(mx<helpbuttx+helpbuttlen))&((my>helpbutty-4)&(my<helpbutty+20))) {     // help button
		helpflag=1;
		drawall();
	}
	else{
		helpflag = 0;
		drawall();
	}
	if(((mx>helpx+350)&(mx<helpx+385))&((my>helpy+10)&(my<helpy+25))) {     // close button on help display
		helpflag2=1;
		drawall();
	}
	else{
		helpflag2 = 0;
		drawall();
	}
}
//..................................................................................................................
function finish(ev) {                                     // mouse up event  
	var mx;
	var my;
	var work

	gotit = 0;

	if(hookupflag == 1) {
		return;
	}
		
	/*if ( ev.layerX ||  ev.layerX == 0) { // Firefox, Chrome
	
   			mx= ev.layerX;
    		my = ev.layerY;
  		} else if (ev.offsetX || ev.offsetX == 0) { // Opera,
		
    		mx = ev.offsetX;
    		my = ev.offsetY;
  		}
		*/
	if(ev.layerX>=ev.offsetX){
		mx = ev.offsetX;
		my = ev.offsetY;
	}
	else {
		mx = ev.layerX;
		my = ev.layerY;
	}
	mousex = mx;
	mousey = my;
	if (modeswitch == 2) {
		finishconn ();
	}
	if (inmotion) {
			checkfinish();
			if (gotit == 1) {
				inmotion = false;	
				drawall();
				return
			}
	}
}
//..................................................................................................................
function startconnect(ev) {              // double click event          -- disconnect / start the connection
	checkstart()	
	if (gotit ==1) {
	
		selement = boardpiles[savb1][savb2];     //source element 
		
		if (mousex < savxcood+20) {                 // back half of the element => disconnect
			swork = elements[selement].type;
			inputinfo ();          // which input ?
			if (gatetable[selement][inputno] == -1) {     // if this input is not in use
				return;                                  // get out
			}
			delement = gatetable[selement][inputno];                // destination element 
			x = inputno + 19;                      // get index for connection number
			connectno = gatetable[selement][x]     // save the connection number
			getoutno();                           // determine which output it is hooked up to via the connection number
			x = inputno + 19;                      // get index for connection number
			gatetable[selement][inputno] = -1;           // clear input in source element  (the element iniating the disconnct)
			gatetable[selement][x] = -1;         // clear connection number in source element
			gatetable[selement][inputno+14] = -1;           // clear input state in source element 
			x = outputno + 19;                      // get index for connection number
			gatetable[delement][outputno] = -1           // clear output in destination element
			gatetable[delement][x] = -1           // clear connection numer in destination element 
			for (i=0;i<100;i++) {
				if (i == connectno) {
					lines[i][0] = -1;
					modeswitch = 0;
					drawall();
					return;
				}
			}
		}
		else {                                        // front half of the element => start the connection
			if(elements[selement].type == "in") {    //  if this an in switch we restrict the dbl click area
				if (mousex < savxcood+28) {         // which starts the connection
					return;
				}	
			}
			outputinfo();                 // look for a good output number in the source element
			if(checkflag != 1) {                   // no available output, can't proceed
				return;
			}
			startlinex = savxcood + 32;
			startliney = savycood + 17 + outadj;
			modeswitch = 2;
		}
	}
}
//..................................................................................................................
function finishconnect(ev) {            // click event                   -- finish the connection
	if (modeswitch == 2) {
		modeswitch = 0;
		lineflag = 0;
		drawall();                  // get rid of the connect line
		checkstart();
		if (gotit == 1) {
			if (mousex > savxcood+20) {                 // front half of the element 
				return;
			}
			delement = boardpiles[savb1][savb2];     //destination element
			//swork = delement;
			swork = elements[delement].type;
			inputinfo ();                           // get the input info
			
			if(checkflag != 1) {                   // input is in use, or element has no inputs; can't proceed
				return;
			}
				endlinex = savxcood;
				endliney = savycood + inputadj;
				dothework();
				/*
				getxadjust();                        //
					
				collinex = startlinex + (xadjust*10) ;
				backflag = 0              // go under the element in backwards line
				if(endliney<=savycood+20) {
					backflag = 1         // go over the element in backwards line
				}
				getline();
				lines [connectno][0] = startlinex;
				lines [connectno][1] = startliney;
				lines [connectno][2] = collinex;
				lines [connectno][3] = endlinex;
				lines [connectno][4] = endliney;
				lines [connectno][5] = backflag;
				x = inputno + 19;                     // get index for connection number
				gatetable[delement][x] = connectno;        
				gatetable[delement][inputno] = selement;
				gatetable[selement][outputno] = delement;
				x = outputno + 19;                        // get index
				gatetable [selement][x] = connectno;
				lineflag = 2;
				drawall();
				*/
		}
	}
}
//...........................................................................................................
function checkfinish() {
	gotit = 0;
	if (mousex<col1) {
		gotit = 1;
		stash();
		return;
	}
	for (m=0;m<11;m++) {
		x =(m*colwidth) + col1;
		for (j=0;j<10;j++) {
			y =(j*colheight) + row1;
			if ((mousex>x)&&(mousex<x+100)) {
				if ((mousey>y)&&(mousey<y+60)) { 
					if(boardpiles[m][j] == -1) {             // is this space available ?
						elements[elementno].sx = x;
						elements[elementno].sy = y;
						boardpiles[m][j] = elementno;
						savem = m;
						gotit = 1;
						return;
					}
					else {
					
						if (fromflag == 1) {                     // return to the parts piles
							elements[elementno].sx = savex;
							elements[elementno].sy = savey;
							partspiles[ppileno].push(elementno);
							gotit = 1;
							return;
						}
						else {                                   // return to the board piles
							elements[elementno].sx = savex;
							elements[elementno].sy = savey;
							boardpiles[savb1][savb2] = elementno;
							savem = m;
							gotit = 1;
							return;
						}
					}
				}
			}
			
		}
	}	
}			
function checkstart() {
	gotit = 0;
	fromflag = 0;

	for (m=0;m<11;m++) {
		x =(m*colwidth) + col1;
		for (j=0;j<10;j++) {
			y =(j*colheight) + row1;
			if ((mousex>x)&&(mousex<x+colwidth-60)) {
				if ((mousey>y)&&(mousey<y+colheight-20)) { 
					if(boardpiles[m][j] != -1) {
						savb1 = m;
						savb2 = j;
						savxcood = x;
						savycood = y;
						//elementno = boardpiles[savb1][savb2];
						//boardpiles[savb1][savb2] = -1;
						gotit = 1;
						fromflag = 2;                 // from the board piles
						return;
					}
				}
			}	
		}
	}
	for (i=0;i<13;i++) {                            // change when adding a new element
		piley = (i*partsheight)+partsy
		if ((mousex>partsstashx)&&(mousex<partswidth+partsstashx)) {
			if ((mousey>piley)&&(mousey<piley+partsheight)) { 
				if (partspiles[i].length != 0) {
					gotit = 1
					elementno = partspiles[i].pop();
					ppileno = i;
					fromflag = 1;                 // from the parts piles
					return
				}
			}			
		}
	}
	if ((mousex>cirbuttx)&&(mousex<cirbuttx+cirbuttlen)) {                     // sample circuit  button
		if	((mousey>cirbutty)&&(mousey<cirbutty+20)) {
			displayflag = 0;
			samples();
			//testit2();
		}
	}
	
	if ((mousex>clrbuttx)&&(mousex<clrbuttx+clrbuttlen)) {                     //  clear circuit  button
		if	((mousey>clrbutty)&&(mousey<clrbutty+20)) {
			displayflag = 0;
			init();
			//testit2();
		}
	}
	
	if ((mousex>savbuttx)&&(mousex<savbuttx+savbuttlen)) {                     // save circuit  button
		if	((mousey>savbutty)&&(mousey<savbutty+20)) {
			displayflag = 0;
			savethecircuit();
		}
	}
	if ((mousex>getbuttx)&&(mousex<getbuttx+getbuttlen)) {                     // get circuit  button
		if	((mousey>getbutty)&&(mousey<getbutty+20)) {
			displayflag = 0;
			getthecircuit();
		}
	}
	if ((mousex>delbuttx)&&(mousex<delbuttx+delbuttlen)) {                     // delete circuit  button
		if	((mousey>delbutty)&&(mousey<delbutty+20)) {
			deletethecircuit();
		}
	}
	if ((mousex>helpbuttx)&&(mousex<helpbuttx+helpbuttlen)) {                     //  help  button
		if	((mousey>helpbutty)&&(mousey<helpbutty+20)) {
			helpon=1;
			//testit3();
		}
	}
	if(((mousex>helpx+350)&(mousex<helpx+385))&((mousey>helpy+10)&(mousey<helpy+25))) {     // close button on help display
		helpon=0;
		drawall();
	}
	
}
function dothework () {
	//endlinex = savxcood;
	//endliney = savycood + inputadj;
	getxadjust();                        //
					
	collinex = startlinex + (xadjust*10) ;
	backflag = 0              // go under the element in backwards line
	if(endliney<=savycood+20) {
		backflag = 1         // go over the element in backwards line
	}
	getline();
	lines [connectno][0] = startlinex;
	lines [connectno][1] = startliney;
	lines [connectno][2] = collinex;
	lines [connectno][3] = endlinex;
	lines [connectno][4] = endliney;
	lines [connectno][5] = backflag;
	x = inputno + 19;                     // get index for connection number
	gatetable[delement][x] = connectno;        
	gatetable[delement][inputno] = selement;
	gatetable[selement][outputno] = delement;
	x = outputno + 19;                        // get index
	gatetable [selement][x] = connectno;
	lineflag = 2;
	drawall();
}
function checksgbutton(){     // check to see if we have pressed the button on the signal generator
	if((mousex>savxcood+8)&&(mousex<savxcood+20)){
		if((mousey>savycood+17)&&(mousey<savycood+26)){
			workimage = elements[elementno].type;     // we have
			wkelement = elementno;
			if(ossflag == 0){           // if off , turn on
				ossflag = 1;
				ossno = 3;            // get the right image
				getimage();
				gatetable[elementno][0] = 1;      // set element state to on
				sgelement = elementno;               // save the signal generator element no
				timevent = setInterval (runsignalgen,500);         // turn timer on
			}
			else{
				ossflag = 0           // if off , turn on
				ossno = 1;
				getimage();
				gatetable[elementno][0] = 0;     // set element state to off
				clearInterval(timevent);                    // turn timer off
			}
		}
	}
}
function inputinfo() {
	checkflag = 0;
	switch (swork) {
		case "in":
			return;
			break;
		case "oss":
			return;
			break;
		case "out":
			inputno = 1;
			inputadj = 28;
			break;
		case "not":
			inputno = 1;
			inputadj = 16;
			break;
		case "buf":
			inputno = 1;
			inputadj = 16;
			break;
		case "dff":
			if(mousey<=savycood+5) {               
				inputno = 1;
				inputadj = 5;
			}
			if((mousey<=savycood+12)&&(mousey>savycood+5)) {               
				inputno = 2;
				inputadj = 10;
			}
			if((mousey<=savycood+19)&&(mousey>savycood+12)) {               
				inputno = 3;
				inputadj = 16;
			}
			if(mousey>savycood+24) {                  
				inputno = 4;
				inputadj =27;
			}
			break;
		case "jkff":
			if(mousey<=savycood+5) {               
				inputno = 1;
				inputadj = 5;
			}
			if((mousey<=savycood+12)&&(mousey>savycood+5)) {               
				inputno = 2;
				inputadj = 10;
			}
			if((mousey<=savycood+19)&&(mousey>savycood+12)) {               
				inputno = 3;
				inputadj = 16;
			}
			if((mousey<=savycood+25)&&(mousey>savycood+19)) {               
				inputno = 4;
				inputadj = 22;
			}
			if(mousey>savycood+24) {                  
				inputno = 5;
				inputadj =27;
			}
			break;
		case "dis":
			if(mousey<=savycood+5) {               
				inputno = 1;
				inputadj = 5;
			}
			if((mousey<=savycood+16)&&(mousey>savycood+5)) {               
				inputno = 2;
				inputadj = 11;
			}
			if((mousey<=savycood+25)&&(mousey>savycood+16)) {               
				inputno = 3;
				inputadj = 21;
			}
			if(mousey>savycood+25) {                  
				inputno = 4;
				inputadj =27;
			}
			break;
		default:
			if(mousey<savycood+20) {               
			inputno = 1;
			inputadj = 8;
			}
			else {
			inputno = 2;
			inputadj = 24;
			}
	}
	if (gatetable[delement][inputno] == -1) {        // is this input in use ?
		checkflag = 1;                                // no, good to go 
	}
}
function outputinfo() {
	checkflag = 0;
	swork = elements[selement].type;
	switch (swork) {
		case "out":                   // no outputs for this element
			return;
			break;                    // no outputs for this element
		case "dis":               
			return;
			break;
		case "dff":
			if(mousey<savycood+20) { 
				for (i=6;i<10;i++) {
					if (gatetable[selement][i] == -1) {
						outputno = i;
						checkflag = 1;
						outadj = -8;
						return;
					}
				}	
			}
			else {
				for (i=10;i<14;i++) {
					if (gatetable[selement][i] == -1) {
						outputno = i;
						checkflag = 1;
						outadj = 8;
						return;
					}
				}	
				
			}
		case "jkff":
			if(mousey<savycood+20) { 
				for (i=6;i<10;i++) {
					if (gatetable[selement][i] == -1) {
						outputno = i;
						checkflag = 1;
						outadj = -10;
						return;
					}
				}	
			}
			else {
				for (i=10;i<14;i++) {
					if (gatetable[selement][i] == -1) {
						outputno = i;
						checkflag = 1;
						outadj = 10;
						return;
					}
				}	
				
			}
		default:
			for (i=6;i<10;i++) {
				if (gatetable[selement][i] == -1) {
				outputno = i;
				checkflag = 1;
				outadj = 0;
				return;
				}
			}
	}
}
function setmode() {
	modeswitch = 1;	
}
function getxadjust() {
	x = elements[selement].sx;         // get the x coordinate for this element
	cx = (x-col1)/colwidth;            // get the column number 0 to 9
	xadjust = 0;
	if(outputno<10){
		outid = selement;
	}
	else{
		outid = selement * 100;      // the inverse output on a flip flop
	}
	for(i=0;i<10;i++) {                      // look for the output id in the column table
		if(coltable[cx][i] == outid) {
			xadjust = i+1;
			return;
		}
	}
	for(i=0;i<10;i++) {                     // if not use the first available position
		if(coltable[cx][i] == -1) {
			coltable[cx][i] = outid;
			xadjust = i+1;
			return;
		} 
	}
}
function getoutno() {
	for (i=25;i<33;i++) {
		if(gatetable[delement][i] == connectno) {
			outputno = i - 19;
			return;
		}
	}
}
function getline() {
	connectno = 0;
	for (i=0;i<100;i++) {
		if (lines[i][0] == -1) {
			connectno = i;
			return;
		}
	}
}
function stash() {
	swork = elements[elementno].type;
	switch (swork) {
		case "and":
			workstashy = andstashy;
			workpile = andpile;
			stashit();
			break;
		case "or":
			workstashy = orstashy;
			workpile = orpile;
			stashit();
			break;
		case "in":
			workstashy = instashy;
			workpile = inpile;
			stashit();
			break;
		case "out":
			workstashy = outstashy;
			workpile = outpile;
			stashit();
			break;
		case "not":
			workstashy = notstashy;
			workpile = notpile;
			stashit();
			break;
		case "nand":
			workstashy = nandstashy;
			workpile = nandpile;
			stashit();
			break;
		case "nor":
			workstashy = norstashy;
			workpile = norpile;
			stashit();
			break;
		case "xor":
			workstashy = xorstashy;
			workpile = xorpile;
			stashit();
			break;
		case "buf":
			workstashy = bufstashy;
			workpile = bufpile;
			stashit();
			break;
		case "dff":
			workstashy = dffstashy;
			workpile = dffpile;
			stashit();
			break;
		case "jkff":
			workstashy = jkffstashy;
			workpile = jkffpile;
			stashit();
			break;
		case "dis":
			workstashy = disstashy;
			workpile = dispile;
			stashit();
			break;
		case "oss":
			workstashy = ossstashy;
			workpile = osspile;
			stashit();
			break;
	}
}
function stashit() {
		elements[elementno].sx = partsstashx;
		elements[elementno].sy = workstashy;
		partspiles[workpile].push(elementno)
}
//...........................................................................................
//         this section runs the pulse
//
function runsignalgen(){
	if(gatetable[sgelement][0] == 1) {
		gatetable[sgelement][0] = 0
		onoff = 0;
		signal = 0;
		ossno = 2;
	}
	else {
		gatetable[sgelement][0] = 1
		onoff = 1;
		signal = 1;
		ossno = 3;
	}
	workimage = elements[sgelement].type;
	wkelement = sgelement;
	getimage();
	runpulse();
}
function togglesw() {                        // toggle the switch
	if(gatetable[elementno][0] == 1) {
		gatetable[elementno][0] = 0
		onoff = 0;
		signal = 0;
	}
	else {
		gatetable[elementno][0] = 1
		onoff = 1;
		signal = 1;
	}
	workimage = elements[elementno].type;
	wkelement = elementno;	
	getimage();
	runpulse();
}
function runpulse() {                        
/*
	if(gatetable[elementno][0] == 1) {
		gatetable[elementno][0] = 0
		onoff = 0;
		signal = 0;
	}
	else {
		gatetable[elementno][0] = 1
		onoff = 1;
		signal = 1;
	}
	workimage = elements[elementno].type;
	wkelement = elementno;	
	getimage();	
*/
	
	newlist.length = 0;	
	updatedestinations();                    // for the switch
	dotheloop();
}
function dotheloop() {
var q
for (q=0;q<20;q++){                     // deal with endless loops, element connected to itself
	if(newlist.length != 0) {
		currentlist.length = 0;
		for(z=0;z<newlist.length;z++) {
			currentlist[z] = newlist[z];
		}
		if(currentlist.length == 0) {
			return
		}
		newlist.length = 0;
		for(w=0;w<currentlist.length;w++) {	
			wkelement = currentlist[w];
			calculateoutput ();	
		}
		for(w=0;w<currentlist.length;w++) {	
			wkelement = currentlist[w];
			updatedestinations();	
		}
			
	}
}	
}
function updatedestinations() {
	for(i=6;i<14;i++) {                           // look at the outputs 
		if(gatetable[wkelement][i] != -1) {          // we have an active output
			dest = gatetable[wkelement][i];               // get the elementno this output is connected too
			connectno = gatetable[wkelement][i+19];       // get the connection number of this output
			if(i<10){
				signal = gatetable[wkelement][0];             // get the state of the output element
			}
			else{
				if(gatetable[wkelement][0]==0){     // we are dealing with the inverse out puts on the flip flops
					signal = 1;
				}
				if(gatetable[wkelement][0]==1){
					signal = 0;
				}
			}
			for(j=1;j<6;j++) {                              // look at the inputs of the destination element
				if(gatetable[dest][j] == wkelement) {     // this input is connected to the output element	
					if(gatetable[dest][j+19] == connectno) {       // check to see if the connection number is the same ?
						gatetable[dest][j+14] = signal;         // update the signal for this input
						newlist.push(dest);                  // add this element to the new list 
					}
				}
			}
		}
	}
	//alert("wkelement = "+wkelement);
	//if(wkelement == 23) {
	//		alert("gatetable[86][16] = "+gatetable[86][16]);
	//	}
}
function calculateoutput() {
	holdtype = elements[wkelement].type;
	switch (holdtype) {
		case "and":
			if ((gatetable[wkelement][15]==1)&&(gatetable[wkelement][16]==1)) {
					gatetable [wkelement][0] = 1;
					onoff = 1;
			}
			else {
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "or":
			if ((gatetable[wkelement][15]==1)||(gatetable[wkelement][16]==1)) {
					gatetable [wkelement][0] = 1;
					onoff = 1;
			}
			else {
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "xor":
			if (((gatetable[wkelement][15]==0)&&(gatetable[wkelement][16]==1)) ||
			((gatetable[wkelement][15]==1)&&(gatetable[wkelement][16]==0))){
					gatetable [wkelement][0] = 1;
					onoff = 1;
			}
			else {
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "out":
			if(gatetable[wkelement][15] == 1) {
				gatetable [wkelement][0] = 1;
				onoff = 1;
			}
			else {
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "not":
			if(gatetable[wkelement][15] == 1) {
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}
			else {
				gatetable [wkelement][0] = 1;
				onoff = 1;
			}
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "nand":
			if ((gatetable[wkelement][15]==1)&&(gatetable[wkelement][16]==1)) {
					gatetable [wkelement][0] = 0;
					onoff = 0;
			}
			else {
				gatetable [wkelement][0] = 1;
				onoff = 1;
			}
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "nor":
			if ((gatetable[wkelement][15]==0)&&(gatetable[wkelement][16]==0)) {
					gatetable [wkelement][0] = 1;
					onoff = 1;
			}
			else {
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "buf":
			if(gatetable[wkelement][15] == 1) {
				gatetable [wkelement][0] = 1;
				onoff = 1;
			}
			else {
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "dff":
			if((gatetable[wkelement][15]!=0) && (gatetable[wkelement][18]!=0)){      // if preset != 0 AND reset !=0
				if((gatetable[wkelement][17]==1)&&(gatetable[wkelement][33]==0)){  // if clock = 1 AND old clock = 0 => rising edge
					gatetable[wkelement][0] = gatetable[wkelement][16];             //state of dff = d input
				}
					gatetable[wkelement][33] = gatetable[wkelement][17];     // old clock = clock
					onoff = gatetable[wkelement][0];                      // onoff = state of dff
			}
			if(gatetable[wkelement][15]==0){    //preset = 0   active low
				gatetable [wkelement][0] = 1;
				onoff = 1;
			}
			if(gatetable[wkelement][18]==0){    //reset = 0   active low
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}	
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "jkff":
			if((gatetable[wkelement][15]!=0) && (gatetable[wkelement][19]!=0)){      // if preset != 0 AND reset !=0
				if((gatetable[wkelement][17]==1)&&(gatetable[wkelement][33]==0)){  // if clock = 1 AND old clock = 0 => rising edge
			
					if(gatetable[wkelement][16]==0){
						if(gatetable[wkelement][18]==1){
							gatetable[wkelement][0]=0;
						}
						if(gatetable[wkelement][18]==0){
							gatetable[wkelement][0]=gatetable[wkelement][0];
						}
					
					}
					if(gatetable[wkelement][16]==1){
						if(gatetable[wkelement][18]==1){
							if(gatetable[wkelement][0]==0){
								gatetable[wkelement][0] = 1;
							}
							else{
								gatetable[wkelement][0] = 0;	
							}
						}
						if(gatetable[wkelement][18]==0){
							gatetable[wkelement][0] = 1;
						}
					}	
				}
				gatetable[wkelement][33] = gatetable[wkelement][17];     // old clock = clock
				onoff = gatetable[wkelement][0];                      // onoff = state of flip flop
			}
			if(gatetable[wkelement][15]==0){    //preset = 0   active low
				gatetable [wkelement][0] = 1;
				onoff = 1;
			}
			if(gatetable[wkelement][19]==0){    //reset = 0   active low
				gatetable [wkelement][0] = 0;
				onoff = 0;
			}	
			workimage = elements[wkelement].type
			getimage();	
			break;
		case "dis":
			distot =0;
			if(gatetable[wkelement][15]==1){
				distot = distot+1;
			}
			if(gatetable[wkelement][16]==1){
				distot = distot+2;
			}
			if(gatetable[wkelement][17]==1){
				distot = distot+4;
			}
			if(gatetable[wkelement][18]==1){
				distot = distot+8;
			}
			switch (distot) {
				case 0:
					elements[wkelement].img = dis0;
					break;
				case 1:
					elements[wkelement].img = dis1;
					break;
				case 2:
					elements[wkelement].img = dis2;
					break;
				case 3:
					elements[wkelement].img = dis3;
					break;
				case 4:
					elements[wkelement].img = dis4;
					break;
				case 5:
					elements[wkelement].img = dis5;
					break;
				case 6:
					elements[wkelement].img = dis6;
					break;
				case 7:
					elements[wkelement].img = dis7;
					break;
				case 8:
					elements[wkelement].img = dis8;
					break;
				case 9:
					elements[wkelement].img = dis9;
					break;
				case 10:
					elements[wkelement].img = dis10;
					break;
				case 11:
					elements[wkelement].img = dis11;
					break;
				case 12:
					elements[wkelement].img = dis12;
					break;
				case 13:
					elements[wkelement].img = dis13;
					break;
				case 14:
					elements[wkelement].img = dis14;
					break;
				case 15:
					elements[wkelement].img = dis15;
					break;
			}
			
			break;
	}
	drawall();
}
function getimage() {
	switch (workimage) {
		case "and":
			holdimage1 = andoff;
			holdimage2 = andon;
			getit();
			break;
		case "or":
			holdimage1 = oroff;
			holdimage2 = oron;
			getit();
			break;
		case "in":
			holdimage1 = inoff;
			holdimage2 = inon;
			getit();
			break;
		case "out":
			holdimage1 = outoff;
			holdimage2 = outon;
			getit();
			break;
		case "not":
			holdimage1 = notoff;
			holdimage2 = noton;
			getit();
			break;
		case "nand":
			holdimage1 = nandoff;
			holdimage2 = nandon;
			getit();
			break;
		case "nor":
			holdimage1 =noroff;
			holdimage2 = noron;
			getit();
			break;
		case "xor":
			holdimage1 =xoroff;
			holdimage2 = xoron;
			getit();
			break;
		case "buf":
			holdimage1 =bufoff;
			holdimage2 = bufon;
			getit();
			break;
		case "dff":
			holdimage1 =dffoff;
			holdimage2 = dffon;
			getit();
			break;
		case "jkff":
			holdimage1 =jkffoff;
			holdimage2 = jkffon;
			getit();
			break;
		case "dis":
			elements[wkelement].img = dis0;
			break;
		case "oss":
			switch (ossno) {
				case 1:
					elements[wkelement].img = ossoffup;
					break;
				case 2:
					elements[wkelement].img = ossoffdown;
					break;
				case 3:
					elements[wkelement].img = ossondown;
					break;
			}
			break;
	}	
	drawall();
}
function getit() {
	if(onoff == 0) {
		elements[wkelement].img = holdimage1;
	}
	else {
		elements[wkelement].img = holdimage2;
	}
}
	
//...........................................................................................
//     this section does the drawing
//
function drawall() {	
	ctx.clearRect(0,0,cwidth,cheight);
	ctx.fillStyle = "white";                   // background
	ctx.fillRect(0,0,1000,600);
	
	ctx.strokeRect(0,0,1000,600);
	ctx.strokeStyle = "black";
	
	ctx.fillStyle = "black"; 
	ctx.fillRect(0,0,1000,30);
	ctx.strokeRect(0,45,55,600);
	
	
	
	ctx.font="bold 14pt sans-serif";                       // the header
	ctx.fillStyle = "white";
	ctx.fillText(theheader,350,20);
	
	ctx.font="bold 10pt sans-serif";                       // message 1
	ctx.fillStyle = "black";
	ctx.fillText(message1,message1x,message1y);
	
	ctx.font="bold 10pt sans-serif";                       // message 2
	ctx.fillStyle = "black";
	ctx.fillText(message2,message2x,message2y);
	
	ctx.font="bold 10pt sans-serif";                       // message 3
	ctx.fillStyle = "black";
	ctx.fillText(message3,message3x,message3y);
	
	ctx.font="bold 10pt sans-serif";                       // message 4
	ctx.fillStyle = "black";
	ctx.fillText(message4,message4x,message4y);
	
	ctx.font="bold 10pt sans-serif";                       // message 5
	ctx.fillStyle = "black";
	ctx.fillText(message5,message5x,message5y);
	
	ctx.font="bold 10pt sans-serif";                       // message 6
	ctx.fillStyle = "black";
	ctx.fillText(message6,message6x,message6y);
	
//      do the buttons

	ctx.font="bold 10pt sans-serif";             
	
	if (cirflag==1){                  // // the circuit button
		ctx.fillStyle = "white";
	}
	else{
		ctx.fillStyle = "silver";
	}
	ctx.fillText("Sample Circuits",cirbuttx+8,cirbutty+14);
	
	if (clrflag==1){                        // the clear button
		ctx.fillStyle = "white";
	}
	else{
		ctx.fillStyle = "silver";
	}
	ctx.fillText("Clear Circuit",clrbuttx+8,clrbutty+14);
	
	if (savflag==1){                        // the save button
		ctx.fillStyle = "white";
	}
	else{
		ctx.fillStyle = "silver";
	}
	ctx.fillText("Save Circuit",savbuttx+8,savbutty+14);
	
	if (getflag==1){                        // the get button
		ctx.fillStyle = "white";
	}
	else{
		ctx.fillStyle = "silver";
	}
	ctx.fillText("Get Circuits",getbuttx+8,getbutty+14);
	
	if (delflag==1){                        // the delete button
		ctx.fillStyle = "white";
	}
	else{
		ctx.fillStyle = "silver";
	}
	ctx.fillText("Delete Circuit",delbuttx+8,delbutty+14);
	
	if (helpflag==1){                           // the help button
		ctx.fillStyle = "white";
	}
	else{
		ctx.fillStyle = "silver";
	}
	ctx.fillText("Help",helpbuttx+8,helpbutty+14);
		
	for (i=0;i<93;i++) {                            // the elements
		elements[i].draw();
	}
	if (lineflag == 0) {
		drawline();
		drawballs();
	}
	if (lineflag == 1) {
		connectline();
		drawline();
		drawballs();
	}
	if (lineflag == 2) {
		drawline();
		drawballs();
	}
	if(helpon == 1){
		ctx.fillStyle = "silver";                  
		ctx.fillRect(helpx,helpy,400,250);
		ctx.strokeRect(helpx+350,helpy+10,35,15);
		ctx.fillStyle = "black";
		ctx.font="bold 8pt sans-serif"; 
		ctx.fillText("Close",helpx+351,helpy+21);     // close button on help display
		ctx.font="bold 10pt sans-serif";                       // help
		ctx.fillStyle = "black";
		ctx.fillText("To Move an Element:",helpx+25,helpy+50);
		ctx.fillText("mouse down on the element",helpx+35,helpy+65);
		ctx.fillText("drag to new position",helpx+35,helpy+80);
		ctx.fillText("mouse up",helpx+35,helpy+95);
		ctx.fillText("To Connect Elements:",helpx+25,helpy+120);
		ctx.fillText("double click on the output of the 1st element",helpx+35,helpy+135);
		ctx.fillText("drag the connect line to the input of the 2nd element",helpx+35,helpy+150);
		ctx.fillText("click mouse",helpx+35,helpy+165);
		ctx.fillText("To Disconnect Elements:",helpx+25,helpy+190);
		ctx.fillText("double click on the input area of the element",helpx+35,helpy+205);
		
		
	}
}
function drawline() {
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	ctx.beginPath();
	
		for (i=0;i<100;i++) {
			if (lines[i][0] != -1) {
				if (lines[i][0]<lines[i][3]) {               // if startx is less than the end x , then forward line
					ctx.moveTo(lines[i][0],lines[i][1]);    // (startx,starty)
					ctx.lineTo(lines[i][2],lines[i][1]);    // (columnx,starty)
					ctx.lineTo(lines[i][2],lines[i][4]);    // (columnx,endliney)
					ctx.lineTo(lines[i][3],lines[i][4]);    // (endlinex,endliney)
					ctx.stroke();
				}
				if (lines[i][0]>lines[i][3]) {               // if startx is >  end x , then backward line
					if (lines[i][5]==1) {           //  backflag = 1  =>  go over the top
						endx = (lines[i][3])-10;
						endy = (lines[i][4])-20;
						ctx.moveTo(lines[i][0],lines[i][1]);    // (startx,starty)
						ctx.lineTo(lines[i][2],lines[i][1]);    // (columnx,starty)
						ctx.lineTo(lines[i][2],endy);    // (columnx,endliney-20)
						ctx.lineTo(endx,endy);    // (endlinex-10,endliney-20)
						ctx.lineTo(endx,lines[i][4]);    // (endlinex-10,endliney)
						ctx.lineTo(lines[i][3],lines[i][4]);    // (endlinex,endliney)
						ctx.stroke();
					}
					else  {                         //  backflag = 0  => go under the bottom
						endx = (lines[i][3])-10;
						endy = (lines[i][4])+20;
						ctx.moveTo(lines[i][0],lines[i][1]);    // (startx,starty)
						ctx.lineTo(lines[i][2],lines[i][1]);    // (columnx,starty)
						ctx.lineTo(lines[i][2],endy);    // (columnx,endliney+20)
						ctx.lineTo(endx,endy);    // (endlinex-10,endliney+20)
						ctx.lineTo(endx,lines[i][4]);    // (endlinex-10,endliney)
						ctx.lineTo(lines[i][3],lines[i][4]);    // (endlinex,endliney)
						ctx.stroke();
					}
				}
			}
		}
}
function drawballs() {            // draw the connection balls
	for (m=0;m<10;m++) {                  // search the breadboard for elements
		for(j=0;j<10;j++) {
			if(boardpiles[m][j] != -1) {        // found one
				workelement = boardpiles[m][j];
				outid = workelement;
				for(k=0;k<10;k++) {                      // get x adjust of the element                    
					if(coltable[m][k] == outid) {
						xadjust = k +1;
					}
				}
				wz1 = 25;
				wz2 = 29;
				dotheballs();
				if((elements[workelement].type=="dff")||(elements[workelement].type=="jkff")){
					outid = workelement*100;
					for(k=0;k<10;k++) {                      // get x adjust of the element                    
						if(coltable[m][k] == outid) {
							xadjust = k +1;
						}
					}
					wz1 = 29;
					wz2 = 33;
					dotheballs();
				}
			}
		}
	}
}
function dotheballs() {
		for (i=0;i<5;i++) {            //initialize the uparray and the dwnarray
					uparray.length = 0;
					dwnarray.length = 0
		}
		for (z=wz1;z<wz2;z++) {          // construct  the up and down arrays
					if(gatetable[workelement][z] != -1) {
						workconnect = gatetable[workelement][z];
						startx = lines[workconnect][0];        
						starty = lines[workconnect][1];        
						
						if(lines[workconnect][4] < starty) {            // if endy < starty  => going up
							if (lines[workconnect][3] < startx) {    // backwards connection ?
								if (lines[workconnect][5] == 1) {  // backflag = 1  => going over the element
									tempy = lines[workconnect][4] - 20;     //  adjust end y for ball ( endy - 20 )
								} else {                                   // going under the element
									tempy = lines[workconnect][4] + 20;     //  adjust end y for ball ( endy + 20 )
								}
							} else {
								tempy = lines[workconnect][4];          // forward connection
							}
							uparray.push(tempy)                 // push endy on to uparray
						}
						if(lines[workconnect][4] > starty) {                  // going down
							if (lines[workconnect][3] < startx) {    // backwards connection ?
								if (lines[workconnect][5] == 1) {  // backflag = 1  => going over the element
									tempy = lines[workconnect][4] - 20;     //  adjust end y for ball ( endy - 20 )
								} else {                                   // going under the element
									tempy = lines[workconnect][4] + 20;     //  adjust end y for ball ( endy + 20 )
								}
							} else {
								tempy = lines[workconnect][4];          // forward connection
							}
							dwnarray.push(tempy)                // push endy on to dwnarray
						}
					}
				}
				if ((uparray[0] > -1) & (dwnarray [0] > -1)) {   // line going up and one going down => need a start ball
					ctx.fillStyle = "black";
					ctx.beginPath();
					dox = startx + xadjust*10;   // start x is the same for every output in a given element
					ctx.arc((dox),starty,3,0,2*Math.PI,false);  // starty is the same for single output elements
					ctx.closePath();
					ctx.fill();
				} 
				uparray.sort(compare);   // call the function compare  with sort to get correct numeric sort 
				uparray.reverse();
				dwnarray.sort(compare);
				for (i=0;i<5;i++) {
					if(uparray.length > (i+1)) {
						ctx.fillStyle = "black";
						ctx.beginPath();
						dox = startx + xadjust*10;        // start x is the same for every output in a given element
						ctx.arc((dox),uparray[i],3,0,2*Math.PI,false);
						ctx.closePath();
						ctx.fill();
					}
					if(dwnarray.length > (i+1)) {
						ctx.fillStyle = "black";
						ctx.beginPath();
						dox = startx + xadjust*10;    // start x is the same for every output in a given element
						ctx.arc((dox),dwnarray[i],3,0,2*Math.PI,false);
						ctx.closePath();
						ctx.fill();
					}
				}
}
function connectline() {
	ctx.strokeStyle = "#ff0000";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(startlinex,startliney);
	ctx.lineTo(mousex,mousey);
	ctx.stroke();
}
function compare(value1, value2) {
	if (value1 < value2) {
		return -1;
	} else if (value1 > value2) {
		return 1;
	} else {
		return 0;
	}
}

//...............................................................................................
function showit() {
/*
	for(counter=6;counter<14;counter++){
		if(gatetable[elementno][counter]!=-1){
			delement = gatetable[elementno][counter];
			getdestin();
			plugvalue();	
		}else{
			inputno = -1;
			plugvalue();
		}
	}
	document.f.no0.value="sci";	
	document.f.no1.value=gatetable[elementno][1];	
	document.f.no2.value=gatetable[elementno][2];
	document.f.no3.value=gatetable[elementno][3];	
	document.f.no4.value=gatetable[elementno][4];
	document.f.no5.value=gatetable[elementno][5];	
	document.f.no6.value=gatetable[elementno][6];
	document.f.no7.value=gatetable[elementno][7];	
	document.f.no8.value=gatetable[elementno][8];
	document.f.no9.value=gatetable[elementno][9];	
	document.f.no10.value=gatetable[elementno][10];
	document.f.no11.value=gatetable[elementno][11];	
	document.f.no12.value=gatetable[elementno][12];
	document.f.no13.value=gatetable[elementno][13];
	document.f.no22.value=savxcood;
	document.f.no23.value=savycood;	
	document.f.no24.value=elementno;
	document.f.no25.value=savb1;	
	document.f.no26.value=savb2;
	
}
function plugvalue(){
	switch (counter) {
		case 6:
			document.f.no14.value=inputno;
			break;
		case 7:
			document.f.no15.value=inputno;
			break;
		case 8:
			document.f.no16.value=inputno;
			break;
		case 9:
			document.f.no17.value=inputno;
			break;
		case 10:
			document.f.no18.value=inputno;
			break;
		case 11:
			document.f.no19.value=inputno;
			break;
		case 12:
			document.f.no20.value=inputno;
			break;
		case 13:
			document.f.no21.value=inputno;
			break;
	}
*/
}

//.....................................logic to reconstruct the sample circuits...........................
function samples(){
	samplecounter = samplecounter+1
	if (samplecounter>6){
		samplecounter=1
	}
	switch (samplecounter) {  
		case 1:
			init();
			sampleid = "sc4";
			theheader = "Exclusive Or";
			buildsamplecircuit();
			message1 = "* Turn each switch on/off to initialize the circuit";
			message1x = 180;
			message1y = 60;
			break;
		case 2:
			init();
			sampleid = "sc5";
			theheader = "Simple RS Flip Flop";
			buildsamplecircuit();
			message1 = "S (set)";
			message1x = 205;
			message1y = 170;
			message2 = "R (reset)";
			message2x = 205;
			message2y = 290;
			message3 = "Q";
			message3x = 610;
			message3y = 180;
			message4 = "__";
			message4x = 610;
			message4y = 275;
			message5 = "Q";
			message5x = 612;
			message5y = 290;
			break;
		case 3:
			init();
			sampleid = "sc2";
			theheader = "Prime Number Detector";
			buildsamplecircuit();
			message1 = "Prime";
			message1x = 700;
			message1y = 175;
			break;
		case 4:
			init();
			sampleid = "sc3";
			theheader = "Shift Register";
			buildsamplecircuit();
			message1 = "* The preset (PR) and the clear (CLR) on the D flip flop are active low (0).";
			message1x = 250;
			message1y = 100;
			message2 = "They need to be set to 1 (switch on) for the circuit to work.";
			message2x = 260;
			message2y = 115;
			message3 = "Preset";
			message3x = 105;
			message3y = 110;
			message4 = "Serial In";
			message4x = 105;
			message4y = 236;
			message5 = "Clock";
			message5x = 105;
			message5y = 351;
			message6 = "Clear";
			message6x = 105;
			message6y = 175;
			//setswitches2();
			drawall();
			break;
		case 5:
			init();
			sampleid = "sc6";
			theheader = "2 Bit Full Adder";
			buildsamplecircuit();
			message1 = "A         +       Carry In                                +                                B" ;                             
			message1x = 273;
			message1y = 75;
			message2 = " =                    C";
			message2x = 778;
			message2y = 75;
			message3 = "A(1)                    A(0)                  Carry In";
			message3x = 110;
			message3y = 172;
			message4 = "B(1)                    B(0)";
			message4x = 510;
			message4y = 172;
			message5 = "* Flip each switch on/off to initialize the circuit";
			message5x = 110;
			message5y = 50;
			message6 = "Carry Out";
			message6x = 745;
			message6y = 440;
			break;
		case 6:
			init();
			sampleid = "sc1";
			theheader = "Synchronous Counter";
			drawall();
			buildsamplecircuit();
			message1 = "* The preset (PR) and the clear (CLR) on the JK flipflop are active low.";
			message1x = 200;
			message1y = 60;
			message2 = "They need to be set to 1 (switch on) for the circuit to work.";
			message2x = 209;
			message2y = 75;
			message3 = "Preset";
			message3x = 70;
			message3y = 80;
			message4 = "Clear";
			message4x = 70;
			message4y = 500;
			message5 = "Input";
			message5x = 168;
			message5y = 140;
			message6 = "(switch on)";
			message6x = 215;
			message6y = 140;
			break;
	}	
}

function buildsamplecircuit() {
var keeper;
	for(keeper=0;keeper<savecircuit1.length;keeper++){
			if(savecircuit1[keeper][0]==sampleid){             // only look at the data for this sample circuit (sampleid)
				workcircuit = savecircuit1[keeper];
				putelements();                              // put the elements on the breadboard
			}
	}
	modeswitch = 0;
	for(keeper=0;keeper<savecircuit1.length;keeper++){
			if(savecircuit1[keeper][0]==sampleid){             // only look at the data for this sample circuit (sampleid)
				workcircuit = savecircuit1[keeper];
				completecircuit();                           // connect the elements
			}
	}
	drawall();
}
function setswitches2() {
	mousex = 165;
	mousey = 155;
	checkstart();
	elementno = boardpiles[savb1][savb2];
	togglesw();

	mousex = 165;
	mousey = 95;
	checkstart();
	elementno = boardpiles[savb1][savb2];
	togglesw();
	
}
function setswitches1() {
//alert("here");
	mousex = 65;
	mousey = 95;
	checkstart();
	elementno = boardpiles[savb1][savb2];
	togglesw();
	

	mousex = 65;
	mousey = 515;
	checkstart();
	elementno = boardpiles[savb1][savb2];
	togglesw();
	
	
	mousex = 165;
	mousey = 155;
	checkstart();
	elementno = boardpiles[savb1][savb2];
	//alert("whewh ! let me catch up");
	togglesw();
	
	
}

//.......................................................................................................
//          the following logic saves/retrieves circuits

function savethecircuit(){
	getcircuitname();
	
	for (m=0;m<11;m++) {
		x =(m*colwidth) + col1;
		for (j=0;j<10;j++) {
			y =(j*colheight) + row1;
			if(boardpiles[m][j] != -1) {
				savxcood = x;
				savycood = y;
				savb1 = m;
				savb2 = j;
				elementno = boardpiles[m][j];
				saveit();
				writeit();
			}
		}
	}
}

function saveit() {
	for(counter=6;counter<14;counter++){
		if(gatetable[elementno][counter]!=-1){
			delement = gatetable[elementno][counter];
			getdestin();
			savevalue();	
		}else{
			inputno = -1;
			savevalue();
		}
	}
	storeit[0]=cirname;	
	storeit[1]=gatetable[elementno][1];	
	storeit[2]=gatetable[elementno][2];
	storeit[3]=gatetable[elementno][3];	
	storeit[4]=gatetable[elementno][4];
	storeit[5]=gatetable[elementno][5];	
	storeit[6]=gatetable[elementno][6];
	storeit[7]=gatetable[elementno][7];	
	storeit[8]=gatetable[elementno][8];
	storeit[9]=gatetable[elementno][9];	
	storeit[10]=gatetable[elementno][10];
	storeit[11]=gatetable[elementno][11];	
	storeit[12]=gatetable[elementno][12];
	storeit[13]=gatetable[elementno][13];
	storeit[22]=savxcood;
	storeit[23]=savycood;	
	storeit[24]=elementno;
	storeit[25]=savb1;	
	storeit[26]=savb2;	
}
function savevalue(){
	switch (counter) {
		case 6:
			storeit[14]=inputno;
			break;
		case 7:
			storeit[15]=inputno;
			break;
		case 8:
			storeit[16]=inputno;
			break;
		case 9:
			storeit[17]=inputno;
			break;
		case 10:
			storeit[18]=inputno;
			break;
		case 11:
			storeit[19]=inputno;
			break;
		case 12:
			storeit[20]=inputno;
			break;
		case 13:
			storeit[21]=inputno;
			break;
	}
}
//
function writeit(){
	recno = "recid"+keycounter;
	keycounter = keycounter + 1;
	localStorage.setItem("recid0",keycounter);
	localStorage.setItem(recno,storeit);
}
function getcircuitname(){
	keycounter = localStorage.getItem("recid0");
	if((keycounter==null)||(localStorage.length==1)){
		keycounter = 1;
		localStorage.setItem("recid0",keycounter);
	}
	keycounter = parseInt(keycounter);
	cirname = "save"+keycounter;
}

//...................................................
function getthecircuit(){
	
	sflag = 0;
	if(localStorage.length>1){
		for(k=1;k<localStorage.length;k++){
			key = localStorage.key(k);
			hold = localStorage.getItem(key);
			workcircuit = hold.split(",");
			lookforit();
			if(xflag==0){
				sflag = 1;
				savedarray[savedarray.length] = workcircuit[0];
				cirname  = workcircuit[0];
				getthecircuit2();
				displayflag = 1;
				break;
			}
		}
		if(sflag==0){
			savedarray.length = 0;
		}
	}
}
function lookforit(){
	xflag = 0;
	for(j=0;j<savedarray.length;j++){
		if(workcircuit[0]==savedarray[j]){
			xflag = 1;
			break
		}
	}
}

function getthecircuit2(){	
	init();
	for(q=1;q<localStorage.length;q++){            // first place the elements on the breadboard
			key = localStorage.key(q);
		hold = localStorage.getItem(key);
			workcircuit = hold.split(",");
			if(workcircuit[0]==cirname){
				putelements();
			}
	}	
	modeswitch = 0;
	for(r=1;r<localStorage.length;r++){             // then connect them
			key = localStorage.key(r);
			hold = localStorage.getItem(key);
			workcircuit = hold.split(",");
			if(workcircuit[0]==cirname){
					completecircuit();
			}
	}	
}
//.....................................................
function deletethecircuit(){
	if(displayflag==1){
		for(i=1;i<localStorage.length;i++){
			key = localStorage.key(i);
			hold = localStorage.getItem(key);
			storeit = hold.split(",");
			if(storeit[0]==cirname){
				localStorage.removeItem(key);
				i = i-1;
			}
		}
		init();
		displayflag = 0;
	}
}

//............................................................
function putelements() {

		elementno = parseInt(workcircuit[24]);
		elements[elementno].sx = parseInt(workcircuit[22]);
		elements[elementno].sy = parseInt(workcircuit[23]);
		x = parseInt(workcircuit[25]);
		y = parseInt(workcircuit[26]);
		boardpiles[x][y] = elementno;
		ppiledel();         // delete this element from the parts pile
}
function completecircuit() {
		elementno = parseInt(workcircuit[24]);
		for(counter=6;counter<14;counter++){
			if(parseInt(workcircuit[counter])!=-1){
				outputno = counter;
				selement = parseInt(workcircuit[24]);
				delement = workcircuit[outputno];
				getoutadj();                                    //get output adjust
				savxcood = parseInt(workcircuit[22]);
				savycood = parseInt(workcircuit[23]);
				startlinex = savxcood + 32;
				startliney = savycood +17 + outadj;
				inputno = parseInt(workcircuit[counter+8]);
				getinadj();                                   // get input adjust
				outputno = counter;
				getend();     // get the coordinates for the destination element
				dothework();
				//showit();
			}
			
		}
}
function ppiledel() {         // delete the element from the parts pile
	swork = elements[elementno].type;
	switch (swork) {                  // first get the parts pile number for this element
		case "and":
			workpile = andpile;
			break;
		case "or":
			workpile = orpile;
			break;
		case "in":
			workpile = inpile;
			break;
		case "out":
			workpile = outpile;
			break;
		case "not":
			workpile = notpile;
			break;
		case "nand":
			workpile = nandpile;
			break;
		case "nor":
			workpile = norpile;
			break;
		case "xor":
			workpile = xorpile;
			break;
		case "buf":
			workpile = bufpile;
			break;
		case "dff":
			workpile = dffpile;
			break;
		case "jkff":
			workpile = jkffpile;
			break;
		case "dis":
			workpile = dispile;
			break;
		case "oss":
			workpile = osspile;
			break;
	}
	for(i=0;i<partspiles[workpile].length;i++){
		if(partspiles[workpile][i] == elementno){
			partspiles[workpile].splice(i,1);
		}
	}
}
function getoutadj() {
	swork = elements[selement].type;
	switch (swork) {
		case "dff":
			if(outputno<10) { 
				outadj = -9;
				return;
			}	
			else {
				outadj = 9;
				return;
			}
		case "jkff":
			if(outputno<10) { 
				outadj = -9;
				return;
			}	
			else { 
				outadj = 9;
				return;
			}
		default:
			outadj = 0;
			return;
	}
}
function getinadj() {
	swork = elements[delement].type;
	switch (swork) {
		case "in":
			return;
			break;
		case "oss":
			return;
			break;
		case "out":
			inputadj = 28;
			break;
		case "not":
			inputadj = 16;
			break;
		case "buf":
			inputadj = 16;
			break;
		case "dff": 
			switch (inputno){
				case 1:
					inputadj = 5;
					break;
				case 2:
					inputadj = 10;
					break;
				case 3:
					inputadj = 16;
					break;
				case 4:
					inputadj = 27;
					break;
			}
			break;
		case "jkff":
			switch (inputno){
				case 1:
					inputadj = 5;
					break;
				case 2:
					inputadj = 10;
					break;
				case 3:
					inputadj = 16;
					break;
				case 4:
					inputadj = 22;
					break;
				case 5:
					inputadj = 27;
					break;
			}
			break;
		case "dis":
			switch (inputno){
				case 1:
					inputadj = 5;
					break;
				case 2:
					inputadj = 11;
					break;
				case 3:
					inputadj = 21;
					break;
				case 4:
					inputadj = 27;
					break;
			}
			break;
		default:
			if(inputno == 1) {               
			inputadj = 8;
			}
			else {
			inputadj = 24;
			}
	}
}
function getdestin(){
	for(inputno=1;inputno<6;inputno++){
		if(gatetable[delement][inputno] == elementno){                 // ok the source element is connected to this element
			if(gatetable[delement][inputno+19]==gatetable[elementno][counter+19]){   //but is this the correct input on this element?
				return;                                                                 //yes
			}
		}
	}
}
function getend(){
	for (m=0;m<11;m++) {
		x =(m*colwidth) + col1;
		for (j=0;j<10;j++) {
			y =(j*colheight) + row1;
			if(boardpiles[m][j] == delement) {
				endlinex = x;
				endliney = y +inputadj;
				savycood = y
				return;
			}	
		}
	}
}
//.................................................
function testit3() {

	alert(localStorage.length);
	for(i=0;i<localStorage.length;i++){
			key = localStorage.key(i);
			hold = localStorage.getItem(key);
			alert(key+" = "+hold);
			//if(key=="lrn2"){
				//localStorage.removeItem(key);
				//i = i-1;
			//}	
	}
	
	//alert(localStorage.length);
}	
function testit2() {
localStorage.clear();
}
function testit() {

alert("mm");

var xxxx ;
var yyyy;
var zzzz;
var aaaa;
var bbbb;
var eeee;
var x = "-10";
var y ="012";
var z = "122";
var xtest = [x,y,z];
localStorage.setItem("LRN1",xtest);
//aaaa = localStorage.key(0);
//alert(aaaa);                               // check page 782
xxxx = localStorage.getItem("LRN1");
alert (xxxx);
//eeee = xxxx.split(",");
//alert(eeee[1]);
//bbbb = parseInt(eeee[1]);
//alert(bbbb);
//zzzz = bbbb + 1;
//alert(zzzz);
}