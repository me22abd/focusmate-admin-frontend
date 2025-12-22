'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { adminApiService } from '@/lib/admin-api';
import type { Achievement } from '@/types';
import { Award } from 'lucide-react';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const data = await adminApiService.getAllAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Failed to load achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading achievements...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="text-muted-foreground">View and manage all achievements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Achievements ({achievements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {achievement.icon && <Award className="h-5 w-5" />}
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Points:</span>
                    <span className="font-semibold">{achievement.points}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
