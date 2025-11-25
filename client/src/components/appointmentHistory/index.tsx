import { AppointmentHistoryItem } from "@/components/appointmentHistoryItem";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface Appointment {
    date: string;
    hour: string;
    type: string;
    doctor: string;
}

interface AppointmentHistoryProps {
    appointments: Appointment[];
}

export function AppointmentHistory({ appointments }: AppointmentHistoryProps) {
   
    const titleText = "Histórico de Consultas";
    const containerMaxWidth = "max-w-xl";
    const containerPadding = "p-6";
    const cardSpacing = "space-y-4";
    const borderStyle = "border-2 border-dashed border-gray-300";
    const backgroundStyle = "bg-white";
    const shadowStyle = "shadow-lg";
    const borderRadius = "rounded-2xl";

    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; 

    
    const parseDate = (dateStr: string, hourStr: string) => {
        const [day, month] = dateStr.split('/').map(Number);
        const [hour, minute] = hourStr.split(':').map(Number);
        const year = new Date().getFullYear();
        return new Date(year, month - 1, day, hour, minute);
    };

   
    const now = new Date();

    
    const pastAppointments = appointments.filter((appointment) => {
        const appointmentDate = parseDate(appointment.date, appointment.hour);
        return appointmentDate < now;
    });

   
    const sortedAppointments = [...pastAppointments].sort((a, b) => {
        const dateA = parseDate(a.date, a.hour);
        const dateB = parseDate(b.date, b.hour);
        return dateB.getTime() - dateA.getTime(); 
    });

    
    const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAppointments = sortedAppointments.slice(startIndex, endIndex);

    
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={`container mx-auto px-4 mt-8 ${containerMaxWidth}`}>
            <h2 className="text-xl font-bold mb-4">{titleText}</h2>
            
            <div className={`${backgroundStyle} ${borderRadius} ${borderStyle} ${shadowStyle} ${containerPadding}`}>
                <div className={cardSpacing}>
                    {currentAppointments.length > 0 ? (
                        currentAppointments.map((appointment, index) => (
                            <AppointmentHistoryItem
                                key={startIndex + index}
                                date={appointment.date}
                                hour={appointment.hour}
                                type={appointment.type}
                                doctor={appointment.doctor}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-8">
                            Nenhuma consulta encontrada no histórico.
                        </p>
                    )}
                </div>

               
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage - 1);
                                        }}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                                
                                
                                {[...Array(totalPages)].map((_, index) => {
                                    const page = index + 1;
                                    const shouldShow = 
                                        page === 1 || 
                                        page === totalPages || 
                                        (page >= currentPage - 1 && page <= currentPage + 1);

                                    if (!shouldShow && page === currentPage - 2) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }

                                    if (!shouldShow && page === currentPage + 2) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }

                                    if (shouldShow) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(page);
                                                    }}
                                                    isActive={currentPage === page}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    }

                                    return null;
                                })}

                                <PaginationItem>
                                    <PaginationNext 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage + 1);
                                        }}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}

