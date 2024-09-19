import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const getHref = (keyword, page) => {
    const adminHref = `/admin/productlist/${page}`;
    const regulatHref = keyword
      ? `/search/${keyword}/page/${page}`
      : `/page/${page}`;

    return !isAdmin ? regulatHref : adminHref;
  };

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            as={Link}
            key={x + 1}
            href={getHref(keyword, x + 1)}
            active={x + 1 === page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
