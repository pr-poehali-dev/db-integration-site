import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const endpoints = [
    {
      name: "Users API",
      path: "/api/users",
      description: "User management endpoints",
      methods: ["GET", "POST"],
      status: "active",
      deprecated: false,
    },
    {
      name: "Products",
      path: "/api/products",
      description: "Product catalog operations",
      methods: ["GET", "POST", "PUT"],
      status: "active",
      deprecated: false,
    },
    {
      name: "Legacy Auth",
      path: "/api/v1/auth",
      description: "Deprecated authentication",
      methods: ["POST"],
      status: "deprecated",
      deprecated: true,
    },
    {
      name: "Analytics",
      path: "/api/analytics",
      description: "Data analytics endpoints",
      methods: ["GET"],
      status: "active",
      deprecated: false,
    },
  ];

  const MethodBadge = ({ method }: { method: string }) => {
    const colors: Record<string, string> = {
      GET: "bg-primary text-primary-foreground",
      POST: "bg-accent text-accent-foreground",
      PUT: "bg-secondary text-secondary-foreground",
      DELETE: "bg-destructive text-destructive-foreground",
    };

    return (
      <Badge className={`${colors[method]} text-xs font-medium`}>
        {method}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            API Database Hub
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Centralized platform for managing and monitoring REST API endpoints
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-in">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Endpoints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{endpoints.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active APIs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {endpoints.filter((e) => e.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    All systems operational
                  </p>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Deprecated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {endpoints.filter((e) => e.deprecated).length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Scheduled for removal
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card
                  key={index}
                  className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    endpoint.deprecated ? "opacity-60" : ""
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon name="Database" className="text-primary" size={20} />
                          <CardTitle className="text-xl">{endpoint.name}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {endpoint.description}
                        </CardDescription>
                      </div>
                      {endpoint.deprecated && (
                        <Badge variant="destructive" className="ml-4">
                          Deprecated
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          {endpoint.methods.map((method) => (
                            <MethodBadge key={method} method={method} />
                          ))}
                        </div>
                        <code className="text-sm bg-muted px-3 py-1 rounded-md text-muted-foreground font-mono">
                          {endpoint.path}
                        </code>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Icon name="Code" size={16} />
                        View Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  Manage and monitor all REST API endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Endpoint management interface coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  API documentation and usage guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Documentation portal coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect with external services and platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Icon name="Link" size={24} />
                  <p>Integration hub coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
