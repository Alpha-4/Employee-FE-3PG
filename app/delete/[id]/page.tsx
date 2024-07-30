"use client"

import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Delete = () => {
    const params=useParams();
    const router=useRouter();

  useEffect(() => {
    const fetchData = async () =>{
        try {
          const response = await axios.delete(BASE_URL+"employee/"+params.id);
        } catch (error: any) {
          console.error(error.message);
        }
      }
  
      fetchData();
      router.push("/");
    }, [params.id, router]);

  return (
    <div>Deleting.....................................................</div>
  )
}

export default Delete