import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios, { all } from "axios";
import { AppraiserStatusOptions } from "../data";
import { FaArchive, FaPause } from "react-icons/fa";

const headCells = [
  {
    id: "order_id",
    numeric: false,
    label: "Order ID",
    width: 80,
  },

  {
    id: "broker",
    numeric: false,
    label: "Appraiser Company Info",
    width: 200,
  },
  {
    id: "plan",
    numeric: false,
    label: "Plan Info",
    width: 100,
  },
  {
    id: "address",
    numeric: false,
    label: "Property Address",
    width: 280,
  },
  {
    id: "status",
    numeric: false,
    label: "Order Status",
    width: 200,
  },
  {
    id: "appraisal_status",
    numeric: false,
    label: "Appraisal Status",
    width: 200,
  },
  {
    id: "remark",
    numeric: false,
    label: "Appraiser Remark",
    width: 170,
  },
  {
    id: "sub_date",
    numeric: false,
    label: "Quote Submitted Date",
    width: 220,
  },
  {
    id: "quote_required_by",
    numeric: false,
    label: "Appraisal Report Required By",
    width: 220,
  },
  {
    id: "urgency",
    numeric: false,
    label: "Request Type",
    width: 140,
  },

  {
    id: "type_of_building",
    numeric: false,
    label: "Property Type",
    width: 140,
  },
  {
    id: "amount",
    numeric: false,
    label: "Estimated Value / Purchase Price",
    width: 150,
  },
  {
    id: "purpose",
    numeric: false,
    label: "Purpose",
    width: 130,
  },
  {
    id: "type_of_appraisal",
    numeric: false,
    label: "Type Of Appraisal",
    width: 160,
  },
  {
    id: "lender_information",
    numeric: false,
    label: "Lender Information",
    width: 160,
  },

  {
    id: "actions_01",
    numeric: false,
    label: "Action",
    width: 80,
  },
];

export default function Exemple({
  userData,
  archievePropertyHandler,
  start,
  end,
  openModalBroker,
  open,
  setModalIsPopupOpen,
  close,
  filterQuery,
  searchInput,
  properties,
  onHoldHandler,
  onCancelHandler,
  userNameSearch,
  statusSearch,
  refresh,
  setRefresh,
  setProperties,
  setOpenPlanModal,
  setViewPlanData,
  setCurrentProperty,
  setFilterQuery,
  setSearchInput,
  setPropertyId,
  setPropValue,
  setBids,
  allBids,
  setModalOpen,
  allAppraisers,
  setAllAppraisers,
  setUserNameSearch,
  setStatusSearch,
  setIsCancelProperty,
  setIsHoldProperty,
  isBidded,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  let tempData = [];

  useEffect(() => {
    if (refresh === true) {
      setSearchInput("");
      setFilterQuery("All");
      setUserNameSearch("");
      setStatusSearch(0);
    }
  }, [refresh]);

  useEffect(() => {
    console.log("userNameSearch", userNameSearch);
    setIsEdited(true);
  }, [userNameSearch, statusSearch]);

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.order_id - a.order_id);
  };

  const getOrderValue = (val) => {
    let title = "";
    AppraiserStatusOptions?.map((status) => {
      if (String(status.id) === String(val)) {
        title = status.type;
      }
    });
    return title;
  };

  const openModal = (propertyId, value, toggle) => {
    if (String(value) === String(1)) {
      setIsHoldProperty(true);
      setPropertyId(propertyId);
      setPropValue(toggle);
    } else {
      setIsCancelProperty(true);
      setPropertyId(propertyId);
      setPropValue(toggle);
    }
    setModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const formatDateNew = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const isAppraiserOnly = (id) => {
    let app = {};
    allAppraisers.map((appraiser, index) => {
      if (String(appraiser.userId) === string(id)) {
        app = appraiser;
      }
    });

    return app?.userId ? true : false;
  };

  const checkAlreadythere = (data, orderId) => {
    let isPresent = false;
    data.map((row, index) => {
      if (String(row.orderId) === String(orderId)) {
        isPresent = true;
      }
    });
    return isPresent;
  };

  const getBidOfProperty = (orderId) => {
    let allBid = [];

    allBids.map((bid, index) => {
      if (String(bid.orderId) === String(orderId)) {
        allAppraisers.map((appraiser, idx) => {
          if (
            String(appraiser.userId) === String(bid.appraiserUserId) &&
            !checkAlreadythere(allBid, bid.orderId)
          ) {
            allBid.push(bid);
          }
        });
      }
    });

    return allBid;
  };

  const refreshHandler = () => {
    setProperties([]);
    setBids([]);
    setRefresh(true);
  };

  const getAppraiser = (userId) => {
    let requiredName = "";
    allAppraisers.map((appraiser, index) => {
      if (String(appraiser.userId) === String(userId)) {
        requiredName = appraiser;
      }
    });
    return requiredName;
  };

  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getPropertyStatusHandler = (property) => {
    let isInProgress = true;
    let isQuoteProvided = false;
    let isCompleted = false;
    let isAccepted = false;
    allBids.map((bid, index) => {
      if (
        bid.orderId === property.orderId &&
        bid.status === 1 &&
        bid.orderStatus === 3 &&
        !property.isOnCancel &&
        !property.isOnHold
      ) {
        isCompleted = true;
      }
      if (
        bid.orderId === property.orderId &&
        bid.status === 1 &&
        !property.isOnCancel &&
        !property.isOnHold
      ) {
        isAccepted = true;
      } else if (
        bid.orderId === property.orderId &&
        !property.isOnCancel &&
        !property.isOnHold
      ) {
        isQuoteProvided = true;
      }
    });
    return isCompleted ? 3 : isAccepted ? 2 : isQuoteProvided ? 1 : 0;
  };

  const isPlanOnly = (plan) => {
    const isLite = String(plan.planName).toLowerCase().includes("lite");
    const isPro = String(plan.planName).toLowerCase().includes("pro");
    const isUltimate = String(plan.planName).toLowerCase().includes("ultimate");
    return isLite || isPro || isUltimate;
  };

  const getCurrentBrokerPlan = (property) => {
    const data = JSON.parse(localStorage.getItem("user"));
    axios
      .get("/api/getBrokerTransactions", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: property?.userId,
        },
      })
      .then((res) => {
        let allPlans = res.data.data.result.$values;
        let requiredPlan = {};
        allPlans.map((plan, index) => {
          if (
            new Date(plan.endDate) >= new Date() &&
            new Date() >= new Date(plan.startDate) &&
            isPlanOnly(plan)
          ) {
            requiredPlan = plan;
          }
        });

        setViewPlanData(requiredPlan);
        setOpenPlanModal(true);
      })
      .catch((err) => {
        toast.error("Caught Error While Fetching the current Plan");
      });
  };

  const openBrokerModalView = (appraiserId) => {
    const selectedAppraiser = getAppraiser(appraiserId);
    openModalBroker(selectedAppraiser, 2);
  };

  const openPopupModal = (property) => {
    setModalIsPopupOpen(true);
    setCurrentProperty(property);
  };

  const isLikeUserSearchedType = (userInfo) => {
    const searchFrom = String(userInfo.firstName).toLowerCase();
    const searchFrom2 = String(userInfo.lastName).toLowerCase();
    const serachWith = String(userNameSearch).toLowerCase();
    if (
      userNameSearch === "" ||
      searchFrom.includes(serachWith) ||
      searchFrom2.includes(serachWith)
    ) {
      return true;
    }
    return false;
  };

  const isAccordingToStatus = (bidStatus, property, isBidded) => {
    if (isBidded.status === 2) return false;
    if (String(statusSearch) === "0") return true;
    if (property.isOnHold && String(statusSearch) === "6") {
      return true;
    }
    if (property.isOnCancel && String(statusSearch) === "5") {
      return true;
    }
    if (String(bidStatus) === "2" && String(statusSearch) === "1") {
      return true;
    }
    if (String(bidStatus) === "3" && String(statusSearch) === "2") {
      return true;
    }
    if (String(bidStatus) === "1" && String(statusSearch) === "3") {
      return true;
    }
    if (String(bidStatus) === "0" && String(statusSearch) === "4") {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const getData = () => {
      properties.map((property, index) => {
        const allListedBids = getBidOfProperty(property.orderId);
        allListedBids?.map((isBidded, index) => {
          const isHold = property.isOnHold;
          const isCancel = property.isOnCancel;
          const showUser = getAppraiser(isBidded.appraiserUserId);
          const isCorrect = isLikeUserSearchedType(showUser);

          const isStatus = getPropertyStatusHandler(property);
          const toSelectedStatus = isAccordingToStatus(
            isStatus,
            property,
            isBidded
          );
          if (!property.isArchive && toSelectedStatus && isCorrect) {
            const updatedRow = {
              order_id: property.orderId,
              sub_date: formatDate(property.addedDatetime),
              quote_required_by: property.quoteRequiredDate
                ? formatDateNew(property.quoteRequiredDate)
                : formatDateNew(property.addedDatetime),
              status:
                isHold || isCancel ? (
                  <span className="btn bg-danger text-light w-100">
                    {isHold ? "On Hold" : "Cancelled"}
                  </span>
                ) : isStatus === 3 ? (
                  <span className="btn btn-completed w-100">Completed</span>
                ) : isStatus === 2 ? (
                  <span className="btn bg-success w-100 text-light">
                    Accepted
                  </span>
                ) : isStatus === 0 ? (
                  <span className="btn bg-primary w-100 text-light">
                    In Progress
                  </span>
                ) : isStatus === 1 ? (
                  <span className="btn bg-info w-100 text-light">
                    Quote Provided
                  </span>
                ) : (
                  <span className="btn bg-info w-100 text-light">
                    Cancelled
                  </span>
                ),
              appraisal_status:
                isHold || isCancel ? (
                  <button className="btn btn-warning w-100">
                    {isHold ? "N.A." : "N.A."}
                  </button>
                ) : isBidded.orderStatus !== 1 &&
                  isBidded.orderStatus !== null &&
                  isBidded.orderStatus !== undefined ? (
                  <div className="hover-text">
                    <div
                      className="tooltip-text"
                      style={{
                        marginTop: "-60px",
                        marginLeft: "-100px",
                      }}
                    >
                      <ul>
                        <li style={{ fontSize: "15px" }}>
                          {getOrderValue(isBidded.orderStatus)}
                        </li>
                      </ul>
                    </div>
                    <span className="btn btn-status w-100">
                      Current Status
                      <span className="m-1">
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                      </span>
                    </span>
                  </div>
                ) : isBidded.$id &&
                  isBidded.status === 1 &&
                  isBidded.orderStatus === 1 &&
                  isBidded.orderStatus !== undefined ? (
                  <div className="hover-text">
                    <div
                      className="tooltip-text"
                      style={{
                        marginTop: "-60px",
                        marginLeft: "-100px",
                      }}
                    >
                      <ul>
                        <li style={{ fontSize: "15px" }}>
                          {getOrderValue(isBidded.orderStatus)} -
                          {formatDate(isBidded.statusDate)}
                        </li>
                      </ul>
                    </div>
                    <span className="btn btn-status w-100">
                      Current Status
                      <span className="m-1">
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                      </span>
                    </span>
                  </div>
                ) : (
                  <span className="btn btn-warning w-100">N.A.</span>
                ),
              address: `${property.streetNumber} ${property.streetName}, ${property.city}, ${property.province}, ${property.zipCode}`,
              remark: isBidded.remark ? isBidded.remark : "N.A.",
              type_of_building: property.typeOfBuilding,
              amount: `$ ${addCommasToNumber(property.estimatedValue)}`,
              purpose: property.purpose,
              type_of_appraisal: property.typeOfAppraisal,
              lender_information: property.lenderInformation
                ? property.lenderInformation
                : "N.A.",
              urgency: property.urgency === 0 ? "Rush" : "Regular",
              broker: (
                <a href="#">
                  <button
                    className="list-inline-item"
                    style={{
                      border: "0px",
                      color: "#2e008b",
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                    }}
                    onClick={() =>
                      openBrokerModalView(isBidded.appraiserUserId)
                    }
                  >
                    {showUser.firstName}
                  </button>
                </a>
              ),
              plan: (
                <a href="#">
                  <button
                    className=""
                    style={{
                      border: "0px",
                      color: "#2e008b",
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => getCurrentBrokerPlan(property)}
                  >
                    plan
                  </button>
                </a>
              ),
              actions_01: (
                <ul>
                  <li title="Archive Property">
                    <span
                      className="btn btn-color-table"
                      onClick={() => archievePropertyHandler(property.orderId)}
                    >
                      <Link className="color-light" href={`/archive-property`}>
                        <span className="text-light">
                          <FaArchive />
                        </span>
                      </Link>
                    </span>
                  </li>
                </ul>
              ),
            };
            tempData.push(updatedRow);
          }
        });
      });
      setIsEdited(false);
      setUpdatedData(tempData);
    };
    getData();
  }, [properties, allAppraisers, isEdited]);

  useEffect(() => {
    setAllAppraisers([]);
    setProperties([]);
    setBids([]);
    const data = JSON.parse(localStorage.getItem("user"));

    axios
      .get("/api/getAllListedProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();
        setDataFetched(true);
        const AllMentionedProperties = res.data.data.properties.$values;

        axios
          .get("/api/getAllBids", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((result) => {
            tempBids = result.data.data.$values;

            setBids(tempBids);
            setProperties(AllMentionedProperties);
          })
          .catch((err) => {
            toast.error(err);
            setDataFetched(false);
            // setModalIsOpenError(true);
          });
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });

    axios
      .get("/api/getAllAppraiserCompanies", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })

      .then((res) => {
        let allappraiser = res.data.data.result.$values;
        setAllAppraisers(allappraiser);
      })
      .catch((err) => {});

    setSearchInput("");
    setFilterQuery("All");

    let tempBids = [];

    setRefresh(false);
  }, [refresh]);
  return (
    <>
      {updatedData && (
        <SmartTable
          title=""
          searchInput={searchInput}
          userNameSearch={userNameSearch}
          setUserNameSearch={setUserNameSearch}
          statusSearch={statusSearch}
          setStatusSearch={setStatusSearch}
          setFilterQuery={setFilterQuery}
          setSearchInput={setSearchInput}
          data={sortObjectsByOrderIdDescending(updatedData)}
          headCells={headCells}
          filterQuery={filterQuery}
          refreshHandler={refreshHandler}
          start={start}
          dataFetched={dataFetched}
          properties={updatedData}
          end={end}
        />
      )}
    </>
  );
}
