import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from "react";
import styles from "./History.module.css";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { FaHashtag } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { isNumericalString } from "framer-motion";

interface TRANSACTION {
  transact_id: string;
  package: string;
  date: string;
  price: string;
  lang: string;
  status: string;
}

type FILTER_CAT_KEYS = "Status" | "Package";

interface FILTER_ITEMS {
  id: string;
  label: string;
}

interface FILTER_CAT {
  filter_category: FILTER_CAT_KEYS;
  filter_items: FILTER_ITEMS[];
}

const filterOptions: FILTER_CAT[] = [
  {
    filter_category: "Status",
    filter_items: [
      { id: "denied", label: "Denied" },
      { id: "pending", label: "Pending" },
      { id: "approved", label: "Approved" },
    ],
  },

  {
    filter_category: "Package",
    filter_items: [
      { id: "basic", label: "Basic" },
      { id: "standard", label: "Standard" },
      { id: "premium", label: "Premium" },
    ],
  },
];

const History = () => {
  //Received List from API
  const [receivedList, setReceivedList] = useState<TRANSACTION[]>([]);

  //Page Hooks
  const [totalPage, setTotalPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [selectPage, setSelectPage] = useState("1");

  //Filters Hooks
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<FILTER_CAT_KEYS, string | null>
  >({ Status: null, Package: null });

  //References
  const selectPageRef = useRef<HTMLInputElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  //API calls
  useEffect(() => {
    fetch(
      `http://localhost:3000/transaction?page=${curPage}${
        selectedFilters.Status === null
          ? ""
          : `&status=${selectedFilters.Status}`
      }${
        selectedFilters.Package === null
          ? ""
          : `&package=${selectedFilters.Package}`
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setReceivedList(data.body);
        setTotalPage(data.totalPage);
      })
      .catch((err) => console.log(err));
  }, [curPage, selectedFilters]);

  //Next-Prev Page buttons
  const nextPage = useCallback(
    () => setCurPage((prev) => Math.min(prev + 1, totalPage)),
    [totalPage]
  );
  const previousPage = useCallback(
    () => setCurPage((prev) => Math.max(prev - 1, 1)),
    []
  );

  //Auto update select page
  useEffect(() => setSelectPage(curPage.toString()), [curPage]);

  useEffect(
    () => setCurPage((prev) => (totalPage < prev ? totalPage : prev)),
    [totalPage]
  );
  //select page changes and submit
  const handleSelectPageChanges = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setSelectPage(event.target.value),
    [selectPage]
  );

  const handleSelectPageSubmission = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      selectPageRef.current?.blur();

      const parsedPage = Number(selectPage);
      const isValidPage =
        !Number.isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPage;
      const newPage = isValidPage ? parsedPage : curPage;

      setCurPage(newPage);
      setSelectPage(newPage.toString());
    },
    [curPage, selectPage, totalPage]
  );

  //Update select hooks
  const handleSelectedFilters = useCallback(
    (category: FILTER_CAT_KEYS, option_id: string) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [category]: prev[category] === option_id ? null : option_id,
      }));
    },
    [selectedFilters]
  );

  return (
    <div className={styles["history-container"]}>
      <div className={styles["utilities-bar"]}>
        <div className={styles["filter-wrapper"]} ref={filterMenuRef}>
          <button
            className={styles["filter-menu-btn"]}
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <FiFilter className={styles["filter-icon"]} />
            <div>Filters</div>
            <IoMdArrowDropdown className={styles["dropdown-icon"]} />
          </button>

          {isFilterMenuOpen && (
            <div className={styles["filter-menu"]}>
              {filterOptions.map((category) => (
                <div className={styles["filter-category"]}>
                  <span className={styles["category-label"]}>
                    {category.filter_category}
                  </span>
                  {category.filter_items.map((option) => (
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          option.id ===
                          selectedFilters[category.filter_category]
                        }
                        onChange={() =>
                          handleSelectedFilters(
                            category.filter_category,
                            option.id
                          )
                        }
                      />
                      <span className={styles["item-label"]}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles["paging-wrapper"]}>
          <button className={styles["page-button"]} onClick={previousPage}>
            <GoTriangleLeft />
          </button>
          <form
            onSubmit={(event) => {
              handleSelectPageSubmission(event);
            }}
          >
            <input
              ref={selectPageRef}
              type="text"
              value={selectPage}
              autoComplete="off"
              className={styles["page-title"]}
              onChange={(event) => {
                handleSelectPageChanges(event);
              }}
            ></input>
          </form>

          <button className={styles["page-button"]} onClick={nextPage}>
            <GoTriangleRight />
          </button>
        </div>
      </div>
      <h3 className={styles["page-count"]}>
        {totalPage >= 1
          ? `Showing ${curPage} out of ${totalPage} pages`
          : "No Results"}
      </h3>
      <div className={styles["card-container"]}>
        {receivedList.map((item) => {
          return (
            <div className={styles["card-item"]} key={item.transact_id}>
              <div className={styles["item-header"]}>
                <div className={styles["transact-icon"]}>
                  <FaHashtag />
                </div>
                <h3 className={styles["transact-id"]}>{item.transact_id}</h3>
              </div>

              <div className={styles["item-description"]}>
                <div className={styles["price"]}>{item.price}</div>
                <div className={styles["date"]}>{item.date}</div>
              </div>

              <div className={styles["item-stats"]}>
                <div className={styles["stat"]}>
                  <div className={styles["package-value"]}>
                    {item.package.normalize()}
                  </div>
                  <div className={styles["stat-label"]}>Package Type</div>
                </div>

                <div className={styles["stat"]}>
                  <div
                    className={`${styles["status-value"]} ${
                      styles[item.status]
                    }`}
                  >
                    {item.status}
                  </div>
                  <div className={styles["stat-label"]}>Status</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
