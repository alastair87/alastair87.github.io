# Use Ubuntu as base image
FROM docker.io/alastair87/ubuntu:24.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# toggle back to root to install packages
USER root

# Install basic dependencies
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    curl \
    wget \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Hugo extended (version from build arg)
ARG HUGO_VERSION=0.152.2
ENV HUGO_VERSION=${HUGO_VERSION}
RUN wget -O hugo.deb "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb" \
    && dpkg -i hugo.deb \
    && rm hugo.deb

# Install Node.js (useful for theme development and tools)
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs

# Install Go (required for Hugo modules)
ENV GO_VERSION=1.25.5
RUN wget -O go.tar.gz "https://golang.org/dl/go${GO_VERSION}.linux-amd64.tar.gz" \
    && tar -C /usr/local -xzf go.tar.gz \
    && rm go.tar.gz
ENV PATH=$PATH:/usr/local/go/bin

# Create a non-root user
ARG USERNAME=ubuntu


# Set the default user
USER $USERNAME

# Verify Hugo installation
RUN hugo version
