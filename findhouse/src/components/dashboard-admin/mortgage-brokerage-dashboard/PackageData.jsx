import axios from "axios";
import toast from "react-hot-toast";
import SmartTable from "./TabularView";
import { useEffect, useState } from "react";

const SearchData = ({
  data,
  properties,
  setRefresh,
  setBroker,
  allBids,
  setOpenBrokerModal,
}) => {
  const [updatedCode, setUpdatedCode] = useState([]);
  const [dataFetched, setDataFetched] = useState(true);

  const headCells = [
    {
      id: "sno",
      numeric: false,
      label: "S.no",
      width: 200,
    },

    {
      id: "brokerage_name",
      numeric: false,
      label: "Brokerage Name",
      width: 200,
    },

    {
      id: "active_plan",
      numeric: false,
      label: "Active Plans",
      width: 200,
    },

    {
      id: "submitted_properties",
      numeric: false,
      label: "Submitted Properties",
      width: 200,
    },
    {
      id: "accepted_properties",
      numeric: false,
      label: "Property Accepted",
      width: 200,
    },
    {
      id: "progress_properties",
      numeric: false,
      label: "Property Appraisal In Progress",
      width: 200,
    },
    {
      id: "completed_properties",
      numeric: false,
      label: "Appraisal Completed",
      width: 200,
    },
    {
      id: "status",
      numeric: false,
      label: "Status",
      width: 200,
    },

    {
      id: "expiry_date",
      numeric: false,
      label: "Expiry Date",
      width: 280,
    },
  ];

  useEffect(() => {
    let tempData = [];
    const getData = () => {
      data?.map((row, index) => {
        const completedProperties = getPropertySubmitted(row.userId).completedProperties;
        const acceptedProperties = getPropertySubmitted(row.userId).acceptedProperties;
        const allProperties = getPropertySubmitted(row.userId).allProperties;
        const pendingProperties = getPropertySubmitted(row.userId).pendingProperties;
        const newRow = {
          sno: index + 1,
          brokerage_name: (
            <span
              onClick={() => openViewModal(row)}
              style={{
                textDecoration: "underline",
                color: "blueviolet",
                cursor: "pointer",
              }}
            >
              {/* {row.firstName} {row.lastName} */}
              {!row.firstName ? "NA" : `${row.firstName} ${row.lastName}`}
            </span>
          ),
          active_plan: row.planName,
          submitted_properties: allProperties,
          accepted_properties : acceptedProperties,
          progress_properties : pendingProperties,
          completed_properties : completedProperties,
          status: row.firstName ? (
            <span className="btn btn-success  w-100">Active</span>
          ) : (
            <span className="btn btn-danger  w-100">In-Active </span>
          ),
          expiry_date: formatDate(row.endDate),
        };

        tempData.push(newRow);
      });
      return tempData;
    };
    const resultedArray = getData();
    setUpdatedCode(resultedArray);
  }, [data, properties]);

  const formatDate = (dateString) => {
    if (dateString === "-") {
      return dateString;
    }
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const originalDate = new Date(dateString);
    const estDate = new Date(originalDate.getTime() - 5 * 60 * 60 * 1000);

    const formattedDate = estDate.toLocaleString("en-US", options);
    return formattedDate;
  };
  const allPropertiesForUser = (id) => {
    let allProperties = 0;
    properties?.map((bid, index) => {
      if (String(bid.userId) === String(id)) {
        allProperties += 1;
      }
    });

    return allProperties;
  };

  const getPropertySubmitted = (userId) => {
    let completedProperties = 0,
      acceptedProperties = 0,
      pendingProperties = 0,
      allProperties = 0;
    allBids.map((bid, index) => {
      if (String(userId) === String(bid.userId)) {
        allProperties += 1;
        if (bid.status === 1 && bid.orderStatus === 3) {
          completedProperties += 1;
        }
        if (bid.status === 1) {
          acceptedProperties += 1;
        }
        if (bid.status === 0) {
          pendingProperties += 1;
        }
      }
    });

    return {
      acceptedProperties, completedProperties, allProperties, pendingProperties
    }
  };

  const openViewModal = (user) => {
    setBroker(user);
    setOpenBrokerModal(true);
  };

  const refreshHandler = () => {
    setRefresh(true);
  };
  return (
    <>
      <SmartTable
        headCells={headCells}
        data={updatedCode}
        properties={updatedCode}
        dataFetched={dataFetched}
        refreshHandler={refreshHandler}
      />
    </>
  );
};

export default SearchData;
