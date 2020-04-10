export class UselCo {
	constructor(_cou) {
		this.name = 'uselCo_' + _cou;
		this.id = 'uselCo_' + _cou;
		this.nazv = 'Узел учёта отопления';
		this.tipe = 'showCoForm';
		this.GIDR = {};
		this.q = 0.555;
		this.t1 = 95;
		this.t2 = 70;
		this.p1 = 65;
		this.p2 = 55;
		this.sx_pr = 0;
		this.fu = 0;
	}
}

export class UselVent {
	constructor(_cou) {
		// this.id = "uselVent_" + _cou;
		// this.name = "Узел учёта вентиляции";
		this.name = 'uselVent_' + _cou;
		this.id = 'uselVent_' + _cou;
		this.nazv = 'Узел учёта вентиляции';
		this.tipe = 'showVentForm';
		this.GIDR = {};
		this.q = 0.512346;
		this.t1 = 130;
		this.t2 = 70;
		this.p1 = 65;
		this.p2 = 55;
		this.sx_pr = 0;
		this.fu = 0;
	}
}

export class UselGvs {
	constructor(_cou) {
		// this.id = "uselGvs_" + _cou;
		// this.name = "Узел учёта ГВС";
		this.name = 'uselGvs_' + _cou;
		this.id = 'uselGvs_' + _cou;
		this.nazv = 'Узел учёта ГВС';
		this.tipe = 'showGvsForm';
		this.GIDR = {};
		this.q = 0.514;
		this.qs = 0.23;
		this.Kchn = 2.2;
		this.t3 = 60;
		this.t4 = 50;
		this.p3 = 55;
		this.p4 = 45;
		this.sx_pr = 0;
		this.txvL = 15;
		this.txvZ = 5;
		this.t11 = '';
		this.koef = 1;
		this.Ktp = 0.25;
		this.Knp = 0.8;
		this.beta = 1.3;
		this.tu = 0;
	}
}
