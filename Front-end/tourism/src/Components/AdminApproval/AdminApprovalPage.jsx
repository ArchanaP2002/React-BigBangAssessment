import React, { useEffect, useState } from 'react';
import { Table } from '@mui/material';
import { Button } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import axios from 'axios';
 
const AdminApprovalPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7228/api/Users/pending');
      setPendingUsers(response.data);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await axios.post(`https://localhost:7228/api/Users/approve/${userId}`);
      fetchPendingUsers();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      await axios.post(`https://localhost:7228/api/Users/reject/${userId}`);
      fetchPendingUsers();
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div>
      <h2>Pending Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
               
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingUsers.map((user) => (
              <TableRow key={user.userId}>
                 <TableCell>{user.userName}</TableCell>
                <TableCell>{user.emailId}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleApproveUser(user.userId)}>
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleRejectUser(user.userId)}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminApprovalPage;
