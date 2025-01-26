function isMatch(s: string, p: string): boolean {
  let memo: number[][] = Array.from({ length: s.length + 1 }, () =>
    Array(p.length + 1).fill(0)
  );
  function traverse(sIdx: number, pIdx: number): boolean {
    // if both reaches end pattern matched
    if (sIdx == s.length && pIdx == p.length) {
      return true;
    }
    // if only pattern reaches end but sorce is remaining then pattern didn't matched
    if (pIdx == p.length) {
      return false;
    }
    if (sIdx == s.length) {
        // if source reaches end and pattern left
        // 2 scenarios 
        //     - either remaining pattern is all * then return true
        //     - else return false
      for (let i = pIdx; i < p.length; i++) {
        if (p.charAt(i) != "*") return false;
      }
      return true;
    }

    // basic dp implementation

    if (memo[sIdx][pIdx] != 0) {
      if (memo[sIdx][pIdx] == 1) return true;
      else return false;
    }

    let result = false;
    if (p.charAt(pIdx) == "*") {
      // choose case
      result = traverse(sIdx, pIdx + 1) || traverse(sIdx + 1, pIdx);
    } else if (p.charAt(pIdx) == s.charAt(sIdx) || p.charAt(pIdx) == "?") {
      // choose case
      result = traverse(sIdx + 1, pIdx + 1);
    }

    memo[sIdx][pIdx] = result == true ? 1 : 2;

    return result;
  }

  return traverse(0, 0);
}

describe("44. Wildcard Matching", () => {
  it("Happy Path - 01", () => {
    expect(isMatch("aa", "a")).toEqual(false);
  });
});
