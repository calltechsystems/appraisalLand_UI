import Header from "../../common/header/dashboard/HeaderAdmin";
import SidebarMenu from "../../common/header/dashboard/SidebarMenuAdmin";
import MobileMenu from "../../common/header/MobileMenu_01";
import TableData from "./TableData";
import Filtering from "./Filtering";
import FilteringBy from "./FilteringBy";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import { useEffect, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { encryptionData } from "../../../utils/dataEncryption";
import Loader from "./Loader";
import { AppraiserStatusOptions } from "../data";
import Form from "../../appraiser-register/Form";
import Link from "next/link";
import { FaCopy } from "react-icons/fa";
import Image from "next/image";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [toggleId, setToggleId] = useState(-1);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [typeView, setTypeView] = useState(0);

  const [openBrokerInfoModel,setOpenBrokerInfoModal]=useState(false);
  const [brokerInfoSelected,setBrokerInfoSelected] = useState({})

  const [closeRegisterModal, setCloseRegisterModal] = useState(false);
  const [toggleWishlist, setToggleWishlist] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [property, setProperty] = useState("");
  const [startLoading, setStartLoading] = useState(false);
  const [filterProperty, setFilterProperty] = useState("");
  const [filterQuery, setFilterQuery] = useState("Last 30 Days");
  const [searchQuery, setSearchQuery] = useState("city");
  const [properties, setProperties] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [lowRangeBid, setLowRangeBid] = useState("");
  const [propertyId, setPropertyId] = useState(null);
  const [updatedCode, setUpdatedCode] = useState(false);

  const [appraiser, setAppraiser] = useState({});
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const [firstName, setFirstName] = useState(
    appraiser?.firstName ? appraiser?.firstName : ""
  );
  const [lastName, setLastName] = useState(
    appraiser?.lastName ? appraiser?.lastName : ""
  );
  const [companyName, setCompanyName] = useState(
    appraiser?.companyName ? appraiser?.companyName : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    appraiser?.phoneNumber ? appraiser?.phoneNumber : ""
  );

  const [streetName, setStreetName] = useState(
    appraiser?.streetName ? appraiser?.streetName : ""
  );
  const [streetNumber, setStreetNumber] = useState(
    appraiser?.streetNumber ? appraiser?.streetNumber : ""
  );
  const [postalCode, setPostalCode] = useState(
    appraiser?.postalCode ? appraiser?.postalCode : ""
  );
  const [city, setCity] = useState(appraiser?.city ? appraiser?.city : "");

  const [start, setStart] = useState(0);

  const [end, setEnd] = useState(5);

  const [currentViewAppraiser, setCurrentViewAppraiser] = useState({});
  const [openViewModal, setOpenViewModal] = useState(false);
  const [appraiserCompanyInfo, setAppraiserCompanyInfo] = useState({});

  const [isStatusModal, setIsStatusModal] = useState(false);

  const [selectedAppraiser, setSelectedAppraiser] = useState(-1);

  const [isActive, setIsActive] = useState(0);
  // const [userInfo, setUserInfo] = useState("");
  const [disable, setDisable] = useState(false);

  const [allBroker, setAllBroker] = useState([])
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentViewAppraiser.userInfo);
      // alert("Copied to clipboard!");
      toast.dismiss();
      toast.success("Copied To Clipboard");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleStatusUpdateHandler = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setDisable(true);
    const payload = {
      id: selectedAppraiser.userId,
      IsActive: !selectedAppraiser.isActive,
    };

    console.log(payload);

    const encryptedData = encryptionData(payload);

    toast.loading("Updating the status");
    axios
      .put("/api/updateIsActiveAppraiser", encryptedData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully Updated!!");
        window.location.reload();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err);
      });

    setSelectedAppraiser(-1);
  };

  const closeStatusUpdateHandler = () => {
    setSelectedAppraiser(-1);
    setOpenEditModal(false);
  };

  const [modalIsOpenError, setModalIsOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading,setIsLoading]=useState(false)

  const [refresh, setRefresh] = useState(false);

  const closeErrorModal = () => {
    setModalIsOpenError(false);
  };

  const [openBrokerModal, setOpenBrokerModal] = useState(false);
  const [broker, setBroker] = useState({});

  const closeBrokerModal = () => {
    setOpenBrokerInfoModal(false);
  };

  const closeQuoteModal = () => {
    setIsModalOpen(false);
  };

  const openQuoteModal = () => {
    setIsModalOpen(false);
    setIsQuoteModalOpen(true);
  };

  const openModalBroker = (data, value) => {
    setBroker(data);
    setTypeView(value);
    setOpenBrokerModal(true);
  };
  const router = useRouter();
  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

  console.log(closeRegisterModal);

  const submitEditHandler = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const payload = {
      firstName: firstName,
      middleName: "",
      lastName: lastName,
      companyName: companyName,
      city: city,
      province: "",
      postalCode: postalCode,
      area: "",
      apartmentNo: "",
      streetName: streetName,
      streetNumber: streetNumber,
      phoneNumber: phoneNumber,
      commissionRate: Number(0),
      maxNumberOfAssignedOrders: Number(0),
      designation: "",
      profileImage: "",
      token: userData.token,
      id: appraiser.userId,
    };

    toast.loading("Updating the profile!!");

    const encryptedBody = encryptionData(payload);

    axios
      .put("/api/updateAppraiserProfile", encryptedBody)
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully updated!!");
        location.reload(true);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Try Again!");
        setAppraiser({});
        setOpenEditModal(false);
      });
  };
  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
    };
  }, []);

  useEffect(() => {
    // Check for inactivity every minute
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;

      // Check if there has been no activity in the last 10 minutes (600,000 milliseconds)
      if (timeSinceLastActivity > 600000) {
        localStorage.removeItem("user");
        router.push("/login");
      }
    }, 60000); // Check every minute

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTimestamp]);

  const openModal = (property) => {
    setProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const filterProperties = (propertys, searchInput) => {
      if (searchInput === "") {
        return propertys;
      }
      const filteredProperties = propertys.filter((property) => {
        // Convert the search input to lowercase for a case-insensitive search
        const searchTerm = searchInput.toLowerCase();

        // Check if any of the fields contain the search term
        return (
          property.firstName?.toLowerCase().includes(searchTerm) ||
          property.lastName?.toLowerCase().includes(searchTerm) ||
          property.emailId?.toLowerCase().includes(searchTerm) 
          );
      });

      return filteredProperties;
    };
    const filteredData = filterProperties(allBroker, searchInput);
    setFilterProperty(filteredData);
  }, [searchInput]);

  const filterData = (tempData) => {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    switch (filterQuery) {
      case "Last 30 Days":
        const thirtyDaysAgo = new Date(currentDate);
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= thirtyDaysAgo
        );
      case "Last 1 month":
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneMonthAgo
        );
      case "Last 6 months":
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= sixMonthsAgo
        );
      case "Last 1 year":
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneYearAgo
        );
      default:
        return tempData; // Return all data if no valid timeFrame is specified
    }
  };

  useEffect(() => {
    const tmpData = filterData(properties);
    setProperties(tmpData);
  }, [filterQuery]);

  const handleDelete = () => {
    const data = JSON.parse(localStorage.getItem("user"));

    toast.loading("deleting this property");
    axios
      .delete("/api/deleteBrokerPropertyById", {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        params: {
          propertyId: property.propertyId,
        },
      })
      .then((res) => {
        setRerender(true);
      })
      .catch((err) => {
        toast.error(err);
      });
    toast.dismiss();
    closeModal();
  };

  useEffect(() => {
    setIsLoading(false);
  }, [updatedCode]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
      router.push("/login");
    }
    // else if (!data?.brokerage_Details.firstName) {
    //   router.push("/appraiser-profile");
    // }
    if (!data) {
      router.push("/login");
    }
    const fetchData = () => {
      if (data) {
        setUserData(data);
      }
    };
    fetchData();
  }, []);

  const closeViewModal = () => {
    setOpenViewModal(false);
    setCurrentViewAppraiser({});
  };

  const participateHandler = (val, id) => {
    setLowRangeBid(val);
    setPropertyId(id);
    setModalOpen(true);
  };

  const onWishlistHandler = (id) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const formData = {
      userId: userData.userId,
      propertyId: id,
      token: userData.token,
    };

    const payload = encryptionData(formData);

    toast.loading("Setting this property into your wishlist");
    axios
      .post("/api/addToWishlist", payload)
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully added !!! ");
        location.reload(true);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
  };

  useEffect(() => {
    console.log(searchQuery);
    const tempData = properties;
    if (searchInput === "") {
      return;
    } else if (searchQuery === "city") {
      const newProperties = tempData.filter((item) => {
        if (item.city.toLowerCase() === searchInput.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
      setSearchResult(newProperties);
    } else if (searchQuery === "state") {
      const newProperties = tempData.filter((item) => {
        if (item.state.toLowerCase() === searchInput.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
      setSearchResult(newProperties);
    } else {
      const newProperties = tempData.filter((item) => {
        if (item.zipCode.toLowerCase() === searchInput.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
      setSearchResult(newProperties);
    }
  }, [searchInput]);

  const brokerInfoHandler = (orderId) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Appraiser Company Information</title></head><body>"
    );
    printWindow.document.write(
      '<button style="display:none;" onclick="window.print()">Print</button>'
    );

    // Clone the table-container and remove the action column
    const tableContainer = document.getElementById("broker-info-container");
    const table = tableContainer.querySelector("table");
    const clonedTable = table.cloneNode(true);
    const rows = clonedTable.querySelectorAll("tr");
    rows.forEach((row) => {
      const lastCell = row.querySelector("td:last-child");
    });

    // Remove the action heading from the table
    const tableHead = clonedTable.querySelector("thead");
    const tableHeadRows = tableHead.querySelectorAll("tr");
    tableHeadRows.forEach((row) => {
      const lastCell = row.querySelector("th:last-child");
    });

    // Make the table responsive for all fields
    const tableRows = clonedTable.querySelectorAll("tr");
    tableRows.forEach((row) => {
      const firstCell = row.querySelector("td:first-child");
      if (firstCell) {
        const columnHeading = tableHeadRows[0].querySelector(
          "th:nth-child(" + (firstCell.cellIndex + 1) + ")"
        ).innerText;
        firstCell.setAttribute("data-th", columnHeading);
      }
    });

    printWindow.document.write(clonedTable.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
      toast.success("Saved the data");
    };
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header userData={userData} />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu userData={userData} />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50 dashboard-height">
        <div
          className="container-fluid ovh table-padding container-padding"
          style={{}}
        >
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                {/* <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div> */}
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 col-xl-12 text-center mt-3">
                  <div className="style2 mb30-991">
                    <h3 className="heading-forms">Manage Appraiser Company</h3>
                  </div>
                </div>
                {/* End .col */}
                {/*<div className="row">
                 <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination
                      setStart={setStart}
                      setEnd={setEnd}
                      properties={properties}
                    />
                  </div>
                </div> 
            </div>*/}

                <div className="col-lg-12 col-xl-12">
                  {/*<div className="candidate_revew_select style2 mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <Filtering setFilterQuery={setFilterQuery} />
                      </li>
                      <li className="list-inline-item">
                        <FilteringBy setFilterQuery={setSearchQuery} />
                      </li>
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox setSearchInput={setSearchInput} />
                        </div>
                      </li>
                    </ul>
              </div>*/}
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="">
                    <div className="property_table">
                      <div className="mt0">
                        <TableData
                          userData={userData}
                          setModalOpen={openModal}
                          close={closeModal}
                          setProperties={setProperties}
                          properties={
                            searchInput === "" ? properties : filterProperty
                          }
                          setBrokerInfoSelected={setBrokerInfoSelected}
                          setOpenBrokerInfoModal={setOpenBrokerInfoModal}
                          setAllBroker={setAllBroker}
                          allBroker={searchInput === "" ? allBroker : filterProperty}
                          setAppraiser={setAppraiser}
                          setUpdatedCode={setUpdatedCode}
                          onWishlistHandler={onWishlistHandler}
                          participateHandler={participateHandler}
                          setErrorMessage={setErrorMessage}
                          setModalIsOpenError={setModalIsOpenError}
                          setRefresh={setRefresh}
                          refresh={refresh}
                          setCurrentViewAppraiser={setCurrentViewAppraiser}
                          setOpenViewModal={setOpenViewModal}
                          setAppraiserCompanyInfo={setAppraiserCompanyInfo}
                          setStartLoading={setStartLoading}
                          openModalBroker={openModalBroker}
                          setIsStatusModal={setIsStatusModal}
                          setSearchInput={setSearchInput}
                          setFilterQuery={setFilterQuery}
                          setOpenEditModal={setOpenEditModal}
                          setCloseRegisterModal={setCloseRegisterModal}
                          start={start}
                          setSelectedAppraiser={setSelectedAppraiser}
                          end={end}
                        />

                        {modalIsOpenError && (
                          <div className="modal">
                            <div
                              className="modal-content"
                              style={{ borderColor: "orangered", width: "20%" }}
                            >
                              <h3
                                className="text-center"
                                style={{ color: "orangered" }}
                              >
                                Error
                              </h3>
                              <div
                                style={{
                                  borderWidth: "2px",
                                  borderColor: "orangered",
                                }}
                              >
                                <br />
                              </div>
                              <h5 className="text-center">{errorMessage}</h5>
                              <div
                                className="text-center"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <button
                                  className="btn w-35 btn-white"
                                  onClick={() => closeErrorModal()}
                                  style={{
                                    borderColor: "orangered",
                                    color: "orangered",
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* {openBrokerModal && (
                          <div className="modal">
                            <div className="modal-content">
                              <span>
                                <h4 className="text-center">Broker Details</h4>
                              </span>
                              <hr />
                              <div className=" col-lg-12">
                                <div className="row">
                                  <h5 className="col-lg-4 mt-1 text-end">
                                    <span className="">Broker Name :</span>{" "}
                                  </h5>
                                  <span className="col-lg-3">
                                    {broker.applicantFirstName}{" "}
                                    {broker.applicantLastName}
                                  </span>
                                </div>
                                <div className="row">
                                  <h5 className="col-lg-4 mt-1">
                                    <span className="">
                                      Broker Phone Number :
                                    </span>{" "}
                                  </h5>
                                  <span className="col-lg-3">
                                    {broker.applicantPhoneNumber}
                                  </span>
                                </div>
                                <div className="row">
                                  <h5 className="col-lg-4 mt-1 text-end">
                                    <span className="">Broker Email :</span>{" "}
                                  </h5>
                                  <span className="col-lg-3">
                                    {broker.applicantEmailAddress}
                                  </span>
                                </div>
                              </div>
                              <hr />
                              <div className="col-lg-12 text-center" style={{}}>
                                <button
                                  className="btn btn-color w-25 mt-2"
                                  onClick={closeBrokerModal}
                                >
                                  Ok
                                </button>
                              </div>
                            </div>
                          </div>
                        )}*/}
                      </div>
                      <div>
                        {openBrokerInfoModel && (
                          <div className="modal">
                            <div className="modal-content">
                              <div className="row">
                                <div className="col-lg-12">
                                  <Link href="/" className="">
                                    <Image
                                      width={50}
                                      height={45}
                                      className="logo1 img-fluid"
                                      style={{ marginTop: "-20px" }}
                                      src="/assets/images/logo.png"
                                      alt="header-logo2.png"
                                    />
                                    <span
                                      style={{
                                        color: "#2e008b",
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                        // marginTop: "20px",
                                      }}
                                    >
                                      Appraisal
                                    </span>
                                    <span
                                      style={{
                                        color: "#97d700",
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                        // marginTop: "20px",
                                      }}
                                    >
                                      {" "}
                                      Land
                                    </span>
                                  </Link>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 text-center">
                                  <h1 className=" text-color mt-1">
                                    Appraiser Company  Details
                                  </h1>
                                </div>
                              </div>
                              <div
                                className="mt-2 mb-3"
                                style={{ border: "2px solid #97d700" }}
                              ></div>
                              <div
                                className="d-flex justify-content-center"
                                id="broker-info-container"
                              >
                                <table
                                  style={{
                                    width: "700px",
                                    textAlign: "start",
                                    borderRadius: "5px",
                                    fontSize: "17px",
                                    fontWeight: "bold",
                                  }}
                                  id="table-broker-info"
                                >
                                  <thead>
                                    <tr>
                                      <th
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          // padding: "5px",
                                          textAlign: "center",
                                        }}
                                      >
                                        Headers
                                      </th>
                                      <th
                                        style={{
                                          border: "1px solid #2e008b",
                                          // width: "470px",
                                          color: "#2e008b",
                                          // padding: "5px",
                                          textAlign: "center",
                                        }}
                                      >
                                        Value
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        <span className="text-start">
                                          Appraiser Company Name
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          width: "250px",
                                          color: "black",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        {brokerInfoSelected.firstName} {brokerInfoSelected.lastName}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        <span className="text-start">
                                          Respective Company Name
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          width: "250px",
                                          color: "black",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        {brokerInfoSelected.appraiserCompanyName}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        <span className="text-start">
                                        Company License Number
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          width: "250px",
                                          color: "black",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        {brokerInfoSelected.licenseNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        <span className="text-start">
                                          Company Name
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          width: "250px",
                                          color: "black",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        {brokerInfoSelected.companyName
                                          ? brokerInfoSelected.companyName
                                          : "N.A."}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        <span className="text-start">
                                          Email Address
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          width: "250px",
                                          color: "black",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        {brokerInfoSelected.emailId}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        <span className="text-start">
                                          Phone Number
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          width: "250px",
                                          color: "black",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        {brokerInfoSelected.phoneNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        <span className="text-start">
                                          Cell Number
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          width: "250px",
                                          color: "black",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        {brokerInfoSelected.cellNumber}
                                      </td>
                                    </tr>
                                    
                                    
                                    <tr>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          color: "#2e008b",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        <span className="text-start">
                                          Address
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #2e008b",
                                          width: "400px",
                                          color: "black",
                                          paddingLeft: "10px",
                                        }}
                                      >
                                        {brokerInfoSelected.streetNumber}{" "}
                                        {brokerInfoSelected.streetName} {brokerInfoSelected.area} ,{" "}
                                        {brokerInfoSelected.city} {brokerInfoSelected.state}-
                                        {brokerInfoSelected.postalCode}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="row text-center mt-3">
                                <div className="col-lg-12">
                                  <div
                                    className="btn btn-color w-25 m-1"
                                    onClick={() =>
                                      brokerInfoHandler(broker.orderId)
                                    }
                                    title="Download Pdf"
                                  >
                                    Download
                                  </div>
                                  <button
                                    className="btn btn-color w-25 text-center"
                                    onClick={closeBrokerModal}
                                  >
                                    Ok
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* End .table-responsive */}

                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>
                {/* End .col */}
              </div>

              {/* {openViewModal && (
                <div className="modal">
                  <div className="modal-content">
                    <div className="row">
                      <div className="col-lg-12">
                        <Link href="/" className="">
                          <Image
                            width={50}
                            height={45}
                            className="logo1 img-fluid"
                            style={{ marginTop: "-20px" }}
                            src="/assets/images/Appraisal_Land_Logo.png"
                            alt="header-logo2.png"
                          />
                          <span
                            style={{
                              color: "#2e008b",
                              fontWeight: "bold",
                              fontSize: "24px",
                              // marginTop: "20px",
                            }}
                          >
                            Appraisal
                          </span>
                          <span
                            style={{
                              color: "#97d700",
                              fontWeight: "bold",
                              fontSize: "24px",
                              // marginTop: "20px",
                            }}
                          >
                            {" "}
                            Land
                          </span>
                        </Link>
                      </div>
                    </div>
                    <h3 className="text-center">View Credentials</h3>
                    <div
                      className="mb-2"
                      style={{ border: "2px solid #97d700" }}
                    ></div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row mb-2 mt-2 text-center">
                          <div className="row mb-2 mt-2">
                            <div className="col-lg-3 mb-2">
                              <label
                                htmlFor=""
                                style={{
                                  paddingTop: "15px",
                                  fontWeight: "lighter",
                                }}
                              >
                                Email / Username <span class="req-btn">*</span>{" "}
                                :
                              </label>
                            </div>
                            <div
                              className="col-lg-7"
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <input
                                type="text"
                                value={currentViewAppraiser.userInfo}
                                // value={userInfo}
                                onChange={(e) => setUserInfo(e.target.value)}
                                className="form-control"
                                id="formGroupExampleInput3"
                              />
                              <button
                                onClick={handleCopy}
                                // onClick={() =>
                                //   copyToClipboard(currentViewAppraiser.email)
                                // }
                                className="btn btn-color w-10 mt-1"
                                title="Copy Username"
                                style={{ marginLeft: "12px" }}
                              >
                                <Link href="#">
                                  <span className="text-light">
                                    <FaCopy />
                                  </span>
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="mb-2"
                          style={{ border: "2px solid #97d700" }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="col-lg-12 text-center"
                      style={{ marginRight: "4%" }}
                    >
                     
                      <button
                        className="btn btn-color w-25"
                        onClick={() => closeViewModal()}
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                </div>
              )} */}

              
            </div>
            
            <div className="row mt50">
              <div className="col-lg-12">
                <div className="copyright-widget-dashboard text-center">
                  <p>
                    &copy; {new Date().getFullYear()} Appraisal Land. All Rights
                    Reserved.
                  </p>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
