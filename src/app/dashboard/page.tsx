'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Award, 
  LogOut, 
  PlusCircle, 
  Clock, 
  ChevronRight,
  BrainCircuit,
  Activity
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        if (data.success) {
          setDashboardData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (!mounted) return null;

  const stats = [
    { label: 'Total Documents', value: dashboardData?.totalDocuments ?? 0, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Quizzes Taken', value: dashboardData?.totalQuizzesTaken ?? 0, icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Average Score', value: `${dashboardData?.averageScore ?? 0}%`, icon: Award, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Study Streak', value: `${dashboardData?.studyStreak ?? 0} Days`, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  const recentDocs = dashboardData?.recentDocs || [];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 p-6 md:p-12 font-sans transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 pb-1">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            Ready to continue your learning journey?
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/documentPage" 
            className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-2.5 rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-lg shadow-neutral-900/20 dark:shadow-white/20"
          >
            <PlusCircle size={18} />
            <span>New Study Material</span>
          </Link>
          <button 
            onClick={() => signOut()} 
            className="flex items-center justify-center p-2.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-in fade-in zoom-in-95"
            style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <Activity className="text-neutral-300 dark:text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Documents */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="text-blue-500" size={22} />
              Recent Documents
            </h2>
            <Link href="/documentPage" className="text-sm text-blue-500 hover:underline flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : recentDocs.length > 0 ? (
              recentDocs.map((doc: any) => (
                <div key={doc.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                        <span className="flex items-center gap-1"><Clock size={12} /> {new Date(doc.date).toLocaleDateString()}</span>
                        {doc.pages && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
                            <span>{doc.pages} pages</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-sm hover:shadow">
                      Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 text-neutral-500 dark:text-neutral-400">
                <FileText className="mx-auto mb-3 opacity-20" size={48} />
                <p>No documents uploaded yet.</p>
                <Link href="/documentPage" className="text-blue-500 hover:underline mt-2 inline-block">Upload your first document</Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Suggestions */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg animate-in fade-in slide-in-from-right-4 duration-700 delay-500 fill-mode-both relative overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black/10 blur-xl"></div>
          
          <h2 className="text-xl font-bold mb-2 relative z-10">Quick Actions</h2>
          <p className="text-indigo-100 text-sm mb-8 relative z-10">What would you like to do today?</p>
          
          <div className="space-y-3 relative z-10">
            <Link href="/documentPage" className="flex items-center gap-3 w-full p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl transition-all hover:translate-x-1 group">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">Upload Document</div>
                <div className="text-xs text-indigo-100">Generate notes from PDF</div>
              </div>
              <ChevronRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
            
            <Link href="/quiz" className="flex items-center gap-3 w-full p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl transition-all hover:translate-x-1 group">
              <div className="p-2 bg-white/20 rounded-lg">
                <BrainCircuit size={20} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">Take a Quiz</div>
                <div className="text-xs text-indigo-100">Test your knowledge</div>
              </div>
              <ChevronRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
