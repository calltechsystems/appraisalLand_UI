import { useEffect, useState } from "react";
import SmartTable from "./TabularView";

const SearchData = ({
  data,
  allBids,
  setRefresh,
  setBroker,
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
      id: "appraiser_company",
      numeric: false,
      label: "Appraiser Company Name",
      width: 200,
    },

    {
      id: "bids",
      numeric: false,
      label: "Quote Provided",
      width: 200,
    },

    {
      id: "quote_accepted",
      numeric: false,
      label: "Quote Accepted",
      width: 200,
    },

    {
      id: "quote_pending",
      numeric: false,
      label: "Quote Pending",
      width: 200,
    },

    {
      id: "completed_bids",
      numeric: false,
      label: "Completed Quotes",
      width: 200,
    },

    {
      id: "status",
      numeric: false,
      label: "Status",
      width: 280,
    },
  ];

  useEffect(() => {
    let tempData = [];
    const getData = () => {
      data?.map((row, index) => {
        const totalBids = allBidForUser(row.userId).allBid;
        const pendingBids = allBidForUser(row.userId).pendingBids;
        const acceptedBids = allBidForUser(row.userId).acceptedBids;
        const completedBids = allBidForUser(row.userId).completedBids;
        const newRow = {
          sno: index + 1,
          appraiser_company: (
            <span
              onClick={() => openViewModal(row)}
              style={{
                textDecoration: "underline",
                color: "blueviolet",
                cursor: "pointer",
              }}
            >
              {!row.firstName ? "NA" : `${row.firstName} ${row.lastName}`}
            </span>
          ),
          bids: totalBids,
          quote_accepted: acceptedBids,
          quote_pending: pendingBids,
          completed_bids: completedBids,
          status: row.firstName ? (
            <span className="btn btn-success  w-100">Active</span>
          ) : (
            <span className="btn btn-danger  w-100">In-Active </span>
          ),
        };

        tempData.push(newRow);
      });
      return tempData;
    };
    const resultedArray = getData();
    setUpdatedCode(resultedArray);
  }, [data, allBids]);

  const allBidForUser = (id) => {
    let allBid = 0,
      acceptedBids = 0,
      completedBids = 0,
      pendingBids = 0;
    allBids?.map((bid, index) => {
      if (String(bid.appraiserUserId) === String(id)) {
        allBid += 1;
        if (bid.status === 1 && bid.orderStatus === 3) {
          completedBids += 1;
        }
        if (bid.status === 1) {
          acceptedBids += 1;
        }
        if (bid.status === 0) {
          pendingBids += 1;
        }
      }
    });
    return { allBid, completedBids, pendingBids, acceptedBids };
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
