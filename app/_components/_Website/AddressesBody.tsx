"use client";
import { instance } from "@/app/Api/axios";
import { arabic } from "@/app/content/AR";
import React, { useState, useEffect } from "react";
import LoadingDashbord from "../LoadingDashbord";
import { PlusCircle } from "lucide-react";
import { UseVariabels } from "@/app/context/VariabelsContext";
import Showaddress from "./ShowAddress";
import dynamic from "next/dynamic";

interface Address {
  id: string;
  full_address: string;
  latitude: number;
  longitude: number;
}

const DynamicMapComponent = dynamic(() => import("../Map"), {
  ssr: false,
});

export default function AddressesBody() {
  const { id, currentuser } = UseVariabels();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [openMap, setOpenMap] = useState(false);
  const [opencurrentaddress, setopencurrentaddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await instance.get(`addresses/${id}/${currentuser.type}`);
        setAddresses(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleAddAddress = async () => {
    if (!selectedLocation) return;
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("user_id", id);
      formdata.append("account_type", currentuser.type);
      formdata.append("latitude", selectedLocation.latitude);
      formdata.append("longitude", selectedLocation.longitude);
      formdata.append("full_address", selectedLocation.address);
      formdata.append("status", "available");

      const res = await instance.post("/addresses/add", formdata);
      setAddresses([...addresses, res.data.data]);
      setOpenMap(false);
      setSelectedLocation(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOnMap = (address: Address) => {
    setSelectedLocation(address);
    setIsAddingNew(false);
    setOpenMap(true);
  };

  const handleAddNewAddress = () => {
    setSelectedLocation(null);
    setIsAddingNew(true);
    setOpenMap(true);
  };
  return (
    <>
      {loading ? (
        <LoadingDashbord />
      ) : (
        <div className="main-page w-full max-w-3xl mx-auto mt-10 px-4">
          <div className="title w-full flex items-center justify-between text-2xl my-4">
            <p>{arabic.addressessavedtext}</p>
            <button
              onClick={handleAddNewAddress}
              className="flex items-center gap-2 text-sm px-3 py-2 bg-secend_color text-white rounded-md shadow-md"
            >
              <p>أَضف عنوان جديد</p>
              <PlusCircle size={16} />
            </button>
          </div>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.id} className="w-full border-b py-4">
                <div className="flex justify-between max-md:flex-col max-md:gap-2 items-center">
                  <p>{address.full_address}</p>
                  <button
                    className="text-secend_color underline text-sm whitespace-nowrap max-md:self-end"
                    onClick={() => {
                      setSelectedLocation(address);
                      setopencurrentaddress(true);
                    }}
                  >
                    انقر لعرضه على الخريطة
                  </button>
                </div>

                {opencurrentaddress && selectedLocation === address && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white py-2 px-1 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mx-4">
                      <Showaddress
                        setLocation={setSelectedLocation}
                        initialLocation={address}
                      />
                      <button
                        className="px-4 py-2 w-fit mr-auto bg-gray-500 text-white rounded-md"
                        onClick={() => setopencurrentaddress(false)}
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              لا توجد عناوين محفوظة حتى الآن.
            </p>
          )}
        </div>
      )}

      {typeof window !== "undefined" && openMap && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mx-4">
            <DynamicMapComponent
              setLocation={setSelectedLocation}
              initialLocation={selectedLocation}
              isAddingNew={isAddingNew}
            />
            <div className="flex justify-end p-4 gap-2">
              <button
                onClick={() => {
                  setOpenMap(false);
                  setSelectedLocation(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                إلغاء
              </button>
              {isAddingNew && (
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-secend_color text-white rounded-md"
                  disabled={!selectedLocation}
                >
                  حفظ العنوان
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
