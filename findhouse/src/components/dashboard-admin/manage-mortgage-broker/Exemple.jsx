import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Loader from "./Loader";

const headCells = [
  {
    id: "firstname",
    numeric: false,
    label: "First Name",
    width: 200,
  },
  {
    id: "lastname",
    numeric: false,
    label: "Last Name",
    width: 200,
  },
  {
    id: "get_info",
    numeric: false,
    label: "Get Broker Info",
    width: 200,
  },
  // {
  //   id: "phone",
  //   numeric: false,
  //   label: "Phone",
  //   width: 200,
  // },

  {
    id: "email",
    numeric: false,
    label: "User ID",
    width: 200,
  },
  // {
  //   id: "date",
  //   numeric: false,
  //   label: "Start Date",
  //   width: 200,
  // },
  {
    id: "status",
    numeric: false,
    label: "Status",
    width: 200,
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 100,
  },
];

let count = 0;

export default function Exemple({
  userData,
  open,
  close,
  start,
  setAppraiser,
  end,
  setAllBroker,
  allBroker,
  setUpdatedCode,
  setCurrentViewAppraiser,
  setOpenViewModal,
  setAppraiserCompanyInfo,
  setCloseRegisterModal,
  properties,
  setBrokerInfoSelected,
  setOpenBrokerInfoModal,
  setIsStatusModal,
  setProperties,
  deletePropertyHandler,
  onWishlistHandler,
  participateHandler,
  setFilterQuery,
  setSearchInput,
  openModalBroker,
  setErrorMessage,
  setModalIsOpenError,
  setOpenEditModal,
  setSelectedAppraiser,
  setRefresh,
  setStartLoading,
  refresh,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [allBrokers, setAllBrokers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [bids, setBids] = useState([]);

  const [hideAction, setHideAction] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [show, setShow] = useState(false);
  let tempData = [];

  const filterBidsWithin24Hours = (property) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let tempBid = 0,
      bidValue = {};

    console.log(bids);
    bids.filter((bid) => {
      if (bid.propertyId === property.propertyId) {
        console.log("matched", bid);
        tempBid = tempBid + 1;
        bidValue = bid;
      } else {
      }
    });
    return tempBid > 0 ? bidValue : {};
  };

  const openInfoModal = (data) => {
    setBrokerInfoSelected(data);
    setOpenBrokerInfoModal(true);
  };

  const openBrokerModalView = (userId) => {
    let currentBroker = {};
    allBrokers.map((broker, index) => {
      if (String(broker.userId) === String(userId)) {
        currentBroker = broker;
      }
    });
    openModalBroker(currentBroker, 2);
  };

  const router = useRouter();

  const openStatusUpdateHandler = () => {
    setIsStatusModal(true);
  };

  const openEditModalHandler = (appraiser) => {
    setSelectedAppraiser(appraiser);
    setOpenEditModal(true);
  };

  const removeWishlistHandler = (id) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const formData = {
      userId: userData.userId,
      propertyId: id,
      token: userData.token,
    };

    const payload = encryptionData(formData);
    toast.loading("removing this property into your wishlist");
    axios
      .delete("/api/removeWishlistProperty", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        params: {
          userId: id,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully removed !!! ");
        location.reload(true);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
  };

  const openModalEdit = (appraiser) => {
    setAppraiser(appraiser);
    setOpenEditModal(true);
  };

  const onDeletePropertyHandler = () => {};

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const checkWishlistedHandler = (data) => {
    let temp = {};
    console.log(wishlist, data);
    wishlist.map((prop, index) => {
      if (String(prop.propertyId) === String(data.propertyId)) {
        temp = prop;
      }
    });
    return temp ? temp : {};
  };

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.appraisal_id - a.appraisal_id);
  };

  const checkData = properties && !updatedData ? true : false;
  useEffect(() => {
    setProperties([]);
  }, [checkData]);

  const getCurrentDate = (id) => {
    let specificAppraiser = {};
    allBroker.map((appraiser, index) => {
      if (String(appraiser.id) === String(id)) {
        specificAppraiser = appraiser;
      }
    });

    return specificAppraiser;
  };

  useEffect(() => {
    const getData = () => {
      const dateNow = formatDate(new Date());
      allBroker.map((data, index) => {
        const getCurrentdate = getCurrentDate(data?.item?.id);
        if (data?.brokerageId === null) {
          const updatedRow = {
            appraiser_id: data.userId,
            firstname: data.firstName ? data.firstName : "-",
            lastname: data.lastName ? data.lastName : "-",
            email: data.emailId ? data.emailId : "-",
            status: data?.phoneNumber ? (
              <span className="btn btn-success  w-100">Active</span>
            ) : !data?.isActive && data?.mortageBrokerageLicNo ? (
              <span className="btn btn-danger  w-100">In-Active </span>
            ) : (
              <span className="btn btn-warning  w-100">Not Registered</span>
            ),
            phone: data.phoneNumber ? data.phoneNumber : "-",
            address: data.streetName
              ? `${data.streetName} ${data.streetNumber},${data.province}-${data.postalCode}`
              : "N.A.",
            date:
              data?.modifiedDateTime !== null
                ? formatDate(data?.modifiedDateTime)
                : "-",
            get_info: (
              <a href="#">
                <button
                  className="list-inline-item"
                  style={{
                    border: "0px",
                    color: "#2e008b",
                    textDecoration: "underline",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => openInfoModal(data)}
                >
                  Get Info
                </button>
              </a>
            ),
            action: (
              <div className="print-hidden-column">
                {data.firstName && (
                  <button
                    className="btn btn-color m-1"
                    onClick={() => openEditModalHandler(data.item)}
                  >
                    <i className="flaticon-edit"></i>
                  </button>
                )}

                {/* <button
                className="btn btn-color m-1"
                onClick={() => openCredModal(data)}
              >
                <i className="flaticon-view"></i>
              </button> */}
              </div>
            ),
          };

          tempData.push(updatedRow);
        }
      });
      setUpdatedData(tempData);
    };
    getData();
  }, [allBroker]);

  useEffect(() => {
    setUpdatedCode(true);
  }, [updatedData]);

  const refreshHandler = () => {
    setRefresh(true);
    setStartLoading(true);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    axios
      .get("/api/getAllBrokers", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        let allBroker = res.data.data.$values;
        console.log("res", res);
        setAllBroker(allBroker);
      })
      .catch((err) => {});

    setRefresh(false);
  }, [refresh]);
  function sortAppraisersByStatus(brokers) {
    const users = brokers;
    let finalResult = [];
    let active = [],
      inactive = [],
      registered = [];
    users.map((user, index) => {
      const status = user.status.props.children.trim();
      if (String(status) === "Active") {
        active.push(user);
      }
      if (String(status) === "In-Active") {
        inactive.push(user);
      }
      if (String(status) === "Not Registered") {
        registered.push(user);
      }
    });

    finalResult.push(...active);
    finalResult.push(...inactive);
    finalResult.push(...registered);
    return finalResult;
  }
  return (
    <>
      {refresh ? (
        <Loader />
      ) : (
        <SmartTable
          title=""
          setSearchInput={setSearchInput}
          setFilterQuery={setFilterQuery}
          data={sortAppraisersByStatus(updatedData)}
          headCells={headCells}
          setRefresh={setRefresh}
          setProperties={setProperties}
          setCloseRegisterModal={setCloseRegisterModal}
          refresh={refresh}
          properties={updatedData}
          dataFetched={dataFetched}
          refreshHandler={refreshHandler}
          setStartLoading={setStartLoading}
          start={start}
          end={end}
        />
      )}
    </>
  );
}
