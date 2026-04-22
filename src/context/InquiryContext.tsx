import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface InquiryContextType {
  unreadCount: number;
  incrementCount: () => void;
  resetCount: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children, user }: { children: ReactNode; user: any }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user || user.email !== 'junctioncyber23@gmail.com') return;

    // Fetch initial count
    const fetchCount = async () => {
      const { count, error } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unread');
      
      if (!error && count !== null) setUnreadCount(count);
    };

    fetchCount();

    // Subscribe to new inquiries
    const channel = supabase
      .channel('realtime_inquiries')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'inquiries' },
        () => {
          setUnreadCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const incrementCount = () => setUnreadCount(prev => prev + 1);
  const resetCount = () => setUnreadCount(0);

  return (
    <InquiryContext.Provider value={{ unreadCount, incrementCount, resetCount }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiries() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error('useInquiries must be used within an InquiryProvider');
  }
  return context;
}
