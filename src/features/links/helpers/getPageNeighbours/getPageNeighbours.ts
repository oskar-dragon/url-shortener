import { getArrayRange } from 'utils';

function getPageNeighbours(totalPages: number, currentPage: number): Array<number> {
  if (totalPages < currentPage) {
    throw new Error('Current page is greater than total pages');
  }

  const arrOfNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (currentPage <= 4) {
    return getArrayRange(arrOfNumbers, 0, 7);
  }

  if (currentPage >= totalPages - 3) {
    return getArrayRange(arrOfNumbers, totalPages - 7, totalPages);
  }

  return getArrayRange(arrOfNumbers, currentPage - 4, currentPage + 3);
}

export default getPageNeighbours;
