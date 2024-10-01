function createShip(
  name,
  length,
  orientation = "horizontal",
  damage = 0,
  sunkStatus = false
) {
  function hit() {
    if (!this.isSunk()) this.damage = this.damage + 1;
  }

  function isSunk() {
    if (this.damage == this.length) return true;

    return false;
  }

  function changeOrientation() {
    if (this.orientation == "horizontal") this.orientation = "vertical";
    else this.orientation == "horizontal";
  }
  return {
    name,
    length,
    orientation,
    damage,
    sunkStatus,
    hit,
    isSunk,
    changeOrientation,
  };
}

export { createShip };
