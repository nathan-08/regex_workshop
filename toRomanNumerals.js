function toRomanNumerals( int ) {
    if (typeof int !== "number") return "NaN"
    if (int < 1) return "less than 1."
    let rn = ''
    while( int > 0 ){
      switch(true){
        case(int/1000>=1): {
          int -= 1000;
          rn += 'M';
          break;
        };
        case(int/500>=1): {
          int -= 500;
          rn += 'D';
          break;
        };
        case(int/100>=1): {
          int -= 100;
          rn += 'C';
          break;
        };
        case(int/50>=1): {
          int -= 50;
          rn += 'L';
          break;
        };
        case(int/10>=1): {
          int -= 10;
          rn += 'X';
          break;
        };
        case(int/5>=1): {
          int -= 5;
          rn += 'V';
          break;
        }
        case(int>=1): {
          int --;
          rn += 'I';
          break;
        }
        default: return;
      }
    }
    // now to fit to Roman syntax where IIII -> IV and VIIII -> IX
    // ___________________________________________________________
    // if 4 of a char
    // if preceding char is the consecutive in numerals array
    // if numindex + 2
    // replace 4 (and preceding 1) with num+numindex+2 (IX)
    // else replace with num+ numindex+1
  
    const numerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
    let baaaaRegex = new RegExp(/\D(\D)\1{3}/)
    let aaaaRegex = new RegExp(/(\D)\1{3}/)
    let flag=true
    while(flag){
      let match = rn.match(baaaaRegex)
      let match2 = rn.match(aaaaRegex)
      if (match && numerals[numerals.indexOf(match[0][1])+1]===numerals[numerals.indexOf(match[0][0])]){
        // baaaa pattern exists
        // if match[0][1] in numerals +2 exists
        if (numerals[numerals.indexOf(match[0][1])+2]){
          // replace match with match[0][1] + numerals (match[0][1]+2)
          rn=rn.replace(baaaaRegex, (match, first, index, str)=>{
            return match[1] + numerals[numerals.indexOf(match[1])+2]
          })
        }
      // check for aaaa pattern 
      // if exists replace aaaa with a, a+1  
      } else if (match2 && numerals[numerals.indexOf(match2[0])+1]) {
        rn=rn.replace(aaaaRegex, (match, first, index, str)=>{
          return match[0] + numerals[numerals.indexOf(match[0])+1]
        })
      } else flag=false
    }
    return rn;
  }
  