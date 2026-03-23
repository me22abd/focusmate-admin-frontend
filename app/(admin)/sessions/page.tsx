'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { adminApiService } from '@/lib/admin-api';
import type { Session } from '@/types';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Search, Filter, Calendar, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await adminApiService.getAllSessions(200, statusFilter !== 'all' ? statusFilter : undefined);
        setSessions(data);
        setFilteredSessions(data);
      } catch (error) {
        console.error('Failed to load sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, [statusFilter]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredSessions(sessions);
      return;
    }

    const filtered = sessions.filter((session) => {
      const query = searchQuery.toLowerCase();
      return (
        session.id.toLowerCase().includes(query) ||
        session.userId?.toLowerCase().includes(query) ||
        session.partnerId?.toLowerCase().includes(query) ||
        session.status?.toLowerCase().includes(query)
      );
    });
    setFilteredSessions(filtered);
  }, [searchQuery, sessions]);

  const formatDuration = (minutes: number | null | undefined) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-center">Loading sessions...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by session ID, user ID, or status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-4 rounded-lg border border-input bg-background"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Sessions ({filteredSessions.length} of {sessions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Session ID</th>
                  <th className="text-left p-4">User ID</th>
                  <th className="text-left p-4">Partner ID</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Duration</th>
                  <th className="text-left p-4">Started</th>
                  <th className="text-left p-4">Ended</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 sm:p-6 lg:p-8 text-center text-muted-foreground">
                      No sessions found
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-slate-50">
                      <td className="p-4 font-mono text-sm">{session.id.slice(0, 8)}...</td>
                      <td className="p-4 font-mono text-sm">{session.userId?.slice(0, 8) || 'N/A'}...</td>
                      <td className="p-4 font-mono text-sm">
                        {session.partnerId ? `${session.partnerId.slice(0, 8)}...` : 'Solo'}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            session.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : session.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {session.status || 'completed'}
                        </span>
                      </td>
                      <td className="p-4">
                        {session.duration ? (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDuration(session.duration)}
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {session.startedAt
                          ? format(new Date(session.startedAt), 'MMM d, HH:mm')
                          : 'N/A'}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {session.endedAt
                          ? format(new Date(session.endedAt), 'MMM d, HH:mm')
                          : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
