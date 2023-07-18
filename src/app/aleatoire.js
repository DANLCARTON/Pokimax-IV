function getPFromId(id) {
    let p = id/100;
    while (p>1) --p;
    return p;
}

function uniforme() {
    return Math.random();
}

function poisson(lambda) {
    let l = Math.exp(-lambda);
    let p = 1.0;
    let k = 0;

    while(p > l) {
        ++k;
        p *= uniforme();
    }

    return k-1;
}

function hypergeometrique(n, m, x, iter) {
    let mTotal = 0;
    for (let i = 0; i < iter; ++i) {
        let xSample = 0;
        for (let j = 0; j < x; ++j) {
            let val = uniforme()*n;
            if (val < m) {
                xSample++;
            }
        }
        mTotal += xSample;
    }
    return mTotal / iter;
}

function gauss(val) {
    return (1/Math.sqrt(2*Math.PI)) * Math.exp(-2.0*val*val);
}

function triangulaire(mode) {
    let val = uniforme();
    if (val < mode) return Math.sqrt(val*mode);
    else return 1-sqrt((1-val)*(1-mode));
}

function densite(id, courbe) {
    let val = uniforme();
    if (courbe == 1) {
        val = uniforme()+3-1.5;
        let image = uniforme()*0.38;
        let obj = gauss(val);
        while (image > obj) {
            val = uniforme()*3-1.5;
            obj = gauss(val);
        }
        val = (val+1.5)/3;
    } else if (courbe == 2) {
        val = triangulaire(1);
    }
    return val;
}

function bernoulli(p) {
    let val = uniforme();
    return val < p ? true : false;
}

export {uniforme, getPFromId, poisson, hypergeometrique, densite, bernoulli};