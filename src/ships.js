function createShip(length, damage = 0, sunkStatus = false) {
  function hit() {
    if (!this.isSunk()) this.damage = this.damage + 1;
  }

  function isSunk() {
    if (damage == length) return true;

    return false;
  }
  return {
    length,
    damage,
    sunkStatus,
    hit,
    isSunk,
  };
}

export { createShip };
