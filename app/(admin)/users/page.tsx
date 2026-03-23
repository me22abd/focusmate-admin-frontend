'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { adminApiService } from '@/lib/admin-api';
import { authService } from '@/lib/auth';
import type { User } from '@/types';
import Button from '@/components/Button';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionUserId, setActionUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await adminApiService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSuspend = async (userId: string) => {
    const admin = authService.getAdmin();
    if (!admin) return;

    try {
      setActionUserId(userId);
      await adminApiService.suspendUser(userId, admin.id);
      // Reload users
      const data = await adminApiService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to suspend user:', error);
    } finally {
      setActionUserId(null);
    }
  };

  const handleDelete = async (userId: string, userEmail: string) => {
    const admin = authService.getAdmin();
    if (!admin) return;

    // Safety: prevent deleting currently logged-in admin account from this screen
    if (admin.id === userId) {
      alert('You cannot delete your currently logged-in admin account.');
      return;
    }

    const confirmed = window.confirm(
      `Delete user "${userEmail}" permanently?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setActionUserId(userId);
      await adminApiService.deleteUser(userId, admin.id);
      const data = await adminApiService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user. Please try again.');
    } finally {
      setActionUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-center">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-muted-foreground">Manage all user accounts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Verified</th>
                  <th className="text-left p-4">Created</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded bg-secondary">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.suspended ? (
                        <span className="text-destructive">Suspended</span>
                      ) : (
                        <span className="text-green-600">Active</span>
                      )}
                    </td>
                    <td className="p-4">
                      {user.isEmailVerified ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-muted-foreground">✗</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuspend(user.id)}
                        disabled={actionUserId === user.id}
                      >
                        {user.suspended ? 'Unsuspend' : 'Suspend'}
                      </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user.id, user.email)}
                          disabled={actionUserId === user.id}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
