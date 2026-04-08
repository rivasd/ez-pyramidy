import type { Category } from "../models";

export const solveXFromC = (c: number) => {
	if (!Number.isInteger(c) || c <= 0) {
		throw new Error("c must be a positive integer");
	}

	const discriminant = 1 + 8 * c;
	const sqrtDisc = Math.sqrt(discriminant);

	const x1 = (-1 + sqrtDisc) / 2;
	const x2 = (-1 - sqrtDisc) / 2;

	return {
		x1,
		x2,
		isIntegerSolution: Number.isInteger(x1),
	};
};

export const findheight = (c: number) => {
	return Math.ceil(solveXFromC(c).x1);
};

export const getGridCss = (categories: Array<Category>) => {
  const pyramidHeigth = findheight(categories.length);
  const dims = {
    rows: pyramidHeigth,
    cols: pyramidHeigth * 2
  }
  const style =  {
      gridTemplateColumns : ((100 / dims["cols"]).toString()+"% ").repeat(dims["cols"]),
      gridTemplateRows: ((100 / dims["rows"]).toString()+"% ").repeat(dims["rows"]),
  }
  return style;
}

export const findCutoffs = (heigth: number) => {
  const cutoffs: number[] = []
  for(let i=0; i<heigth; i++){
      if(cutoffs.length === 0){
          cutoffs.push(1);
      }
      else{
          cutoffs.push(cutoffs[cutoffs.length-1]+i);
      }
  }
  return cutoffs
}

export const getStyles = (categories: Array<Category>) => {
  const pyramidHeigth = findheight(categories.length);
  const cutoffs = findCutoffs(pyramidHeigth);
  
  const perRowStyles = cutoffs.map((threshold, row) => {
    const startingCol = pyramidHeigth - row;
      return Array(row+1).fill(0).map((_, i) => {
        if((threshold+i) > categories.length){
            return undefined;
        }
        return {
            gridColumnStart: startingCol+ (i*2),
            gridColumnEnd: "span 2",
            gridRowStart:row+1
        }
      })
  })
  return perRowStyles.flat();
}