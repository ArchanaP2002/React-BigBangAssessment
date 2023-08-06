import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

async function generatePDF(booking) {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([500, 300]);
  const { width, height } = page.getSize();

  const fontSize = 20;
  const text = `   Booking Details
Booking ID: ${booking.bookingId}
User ID: ${booking.userId}
Package ID: ${booking.packageId}
Number of People: ${booking.numberOfPeople}
Date of the Trip: ${booking.dateOfTheTrip}
Total Amount: ${booking.totalAmount}
Date of Booking: ${booking.dateOfBooking}
`;

  page.drawText(text, {
    x: 50,
    y: height - 50,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

function BookingPDFGenerator({ booking }) {
  const handleGeneratePDF = async () => {
    const pdfBlob = await generatePDF(booking);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'booking_details.pdf';
    link.click();
  };

  return (
    <div>
      <button onClick={handleGeneratePDF} style={{ marginTop: '2px', marginLeft: '2px' }}>
        Generate PDF
      </button>
    </div>
  );
}

export default BookingPDFGenerator;
