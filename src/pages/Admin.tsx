import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, ArrowLeft, Mail, Clock, Trash2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
        return;
      }
      if (!isAdmin) {
        toast({
          title: 'Access Denied',
          description: 'You do not have admin privileges.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }
      fetchRequests();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch contact requests.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
      toast({
        title: 'Status Updated',
        description: `Request marked as ${status}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status.',
        variant: 'destructive',
      });
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;

    try {
      const { error } = await supabase
        .from('contact_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRequests(requests.filter(r => r.id !== id));
      toast({
        title: 'Deleted',
        description: 'Contact request has been deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete request.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Progress</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-12 h-12 text-primary mx-auto animate-pulse" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-primary" />
                <span className="text-lg font-display font-bold text-gradient-gold">
                  Admin Panel
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRequests}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Contact Requests
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage incoming project inquiries from potential clients.
          </p>

          {isLoading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 text-primary mx-auto animate-spin" />
              <p className="mt-4 text-muted-foreground">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12 glass rounded-2xl">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No requests yet</h3>
              <p className="text-muted-foreground">
                Contact requests will appear here when clients submit the form.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {request.name}
                        </h3>
                        {getStatusBadge(request.status)}
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Email:</span>
                          <a
                            href={`mailto:${request.email}`}
                            className="block text-primary hover:underline"
                          >
                            {request.email}
                          </a>
                        </div>
                        {request.company && (
                          <div>
                            <span className="text-muted-foreground">Company:</span>
                            <p className="text-foreground">{request.company}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Project:</span>
                          <p className="text-foreground capitalize">{request.project_type}</p>
                        </div>
                        {request.budget && (
                          <div>
                            <span className="text-muted-foreground">Budget:</span>
                            <p className="text-foreground">{request.budget}</p>
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground">Message:</span>
                        <p className="text-foreground mt-1">{request.message}</p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDate(request.created_at)}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(request.id, 'in_progress')}
                        className="gap-1"
                      >
                        <Clock className="w-3 h-3" />
                        In Progress
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(request.id, 'completed')}
                        className="gap-1 text-green-400 border-green-500/30 hover:bg-green-500/10"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Complete
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(request.id, 'rejected')}
                        className="gap-1 text-red-400 border-red-500/30 hover:bg-red-500/10"
                      >
                        <XCircle className="w-3 h-3" />
                        Reject
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRequest(request.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
