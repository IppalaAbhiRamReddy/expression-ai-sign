
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link, useSearchParams } from "react-router-dom";

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Update auth mode based on URL parameter
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setAuthMode('signup');
    } else {
      setAuthMode('login');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Success!",
      description: authMode === 'login' ? "Welcome back!" : "Account created successfully!",
    });
    
    setIsLoading(false);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50"
      initial="initial"
      animate="animate"
      variants={pageVariants}
      transition={{ duration: 0.6 }}
    >
      {/* Mini Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500"></div>
            <span className="text-xl font-bold">SignVerse</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Left Side - Hero */}
          <motion.div 
            className="hidden lg:flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-gradient-to-br from-blue-100 to-orange-100 rounded-3xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl">👋</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Welcome to SignVerse</h3>
                  <p className="text-gray-600">Join our community of learners and break communication barriers</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Auth Forms */}
          <motion.div 
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {authMode === 'login' && 'Welcome Back'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Reset Password'}
                  {authMode === 'reset' && 'New Password'}
                </CardTitle>
                <CardDescription>
                  {authMode === 'login' && 'Sign in to your account'}
                  {authMode === 'signup' && 'Join the SignVerse community'}
                  {authMode === 'forgot' && 'Enter your email to reset password'}
                  {authMode === 'reset' && 'Enter your new password'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <AnimatePresence mode="wait">
                  {authMode === 'login' && (
                    <motion.div
                      key="login"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <LoginForm 
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        onForgotPassword={() => setAuthMode('forgot')}
                        onSignup={() => setAuthMode('signup')}
                      />
                    </motion.div>
                  )}

                  {authMode === 'signup' && (
                    <motion.div
                      key="signup"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <SignupForm 
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        showConfirmPassword={showConfirmPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                        onLogin={() => setAuthMode('login')}
                      />
                    </motion.div>
                  )}

                  {authMode === 'forgot' && (
                    <motion.div
                      key="forgot"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <ForgotPasswordForm 
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        onBack={() => setAuthMode('login')}
                      />
                    </motion.div>
                  )}

                  {authMode === 'reset' && (
                    <motion.div
                      key="reset"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <ResetPasswordForm 
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        showConfirmPassword={showConfirmPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Auth Footer */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-gray-600">
                Need help? <Link to="/contact" className="text-blue-600 hover:underline">Contact Support</Link>
              </p>
              <div className="flex justify-center space-x-4 text-gray-400">
                <span className="text-xs">© 2024 SignVerse. All rights reserved.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Login Form Component
const LoginForm = ({ onSubmit, isLoading, showPassword, setShowPassword, onForgotPassword, onSignup }: any) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {/* Google OAuth */}
    <Button variant="outline" className="w-full" type="button">
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </Button>

    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">Or continue with email</span>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input id="email" type="email" placeholder="your@email.com" className="pl-10" required />
        </div>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Enter password" 
            className="pl-10 pr-10" 
            required 
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <button
        type="button"
        className="text-sm text-blue-600 hover:underline"
        onClick={onForgotPassword}
      >
        Forgot password?
      </button>
    </div>

    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? "Signing in..." : "Sign In"}
    </Button>

    <p className="text-center text-sm text-gray-600">
      Don't have an account?{" "}
      <button type="button" className="text-blue-600 hover:underline" onClick={onSignup}>
        Sign up
      </button>
    </p>
  </form>
);

// Signup Form Component
const SignupForm = ({ onSubmit, isLoading, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, onLogin }: any) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {/* Google OAuth */}
    <Button variant="outline" className="w-full" type="button">
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Sign up with Google
    </Button>

    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">Or create account with email</span>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input id="fullName" type="text" placeholder="John Doe" className="pl-10" required />
        </div>
      </div>

      <div>
        <Label htmlFor="signupEmail">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input id="signupEmail" type="email" placeholder="your@email.com" className="pl-10" required />
        </div>
      </div>

      <div>
        <Label htmlFor="signupPassword">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="signupPassword" 
            type={showPassword ? "text" : "password"} 
            placeholder="Create password (min 8 chars)" 
            className="pl-10 pr-10" 
            minLength={8}
            required 
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Confirm password" 
            className="pl-10 pr-10" 
            required 
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>
        </Label>
      </div>
    </div>

    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? "Creating account..." : "Create Account"}
    </Button>

    <p className="text-center text-sm text-gray-600">
      Already have an account?{" "}
      <button type="button" className="text-blue-600 hover:underline" onClick={onLogin}>
        Sign in
      </button>
    </p>
  </form>
);

// Forgot Password Form Component
const ForgotPasswordForm = ({ onSubmit, isLoading, onBack }: any) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <Label htmlFor="resetEmail">Email Address</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          id="resetEmail" 
          type="email" 
          placeholder="Enter your email address" 
          className="pl-10" 
          required 
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        We'll send you a link to reset your password.
      </p>
    </div>

    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? "Sending..." : "Send Reset Link"}
    </Button>

    <Button type="button" variant="ghost" className="w-full" onClick={onBack}>
      Back to Sign In
    </Button>
  </form>
);

// Reset Password Form Component
const ResetPasswordForm = ({ onSubmit, isLoading, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }: any) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <Label htmlFor="newPassword">New Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          id="newPassword" 
          type={showPassword ? "text" : "password"} 
          placeholder="Enter new password" 
          className="pl-10 pr-10" 
          minLength={8}
          required 
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>

    <div>
      <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          id="confirmNewPassword" 
          type={showConfirmPassword ? "text" : "password"} 
          placeholder="Confirm new password" 
          className="pl-10 pr-10" 
          required 
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>

    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? "Resetting..." : "Reset Password"}
    </Button>
  </form>
);

export default Auth;
