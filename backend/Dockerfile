FROM golang:latest AS base

# enable Go modules support
ENV GO111MODULE=on \
		CGO_ENABLED=0 \
		GOOS=linux

# WORKDIR $GOPATH/src/github.com/myrepo/myapp

# manage dependencies
COPY go.mod .
COPY go.sum .
RUN go mod download

FROM base as prod

# Copy src code from the host and compile it
COPY cmd cmd

RUN go build -o /backend ./cmd

# RUN apk --no-cache add ca-certificates
# COPY --from=builder /backend /bin
CMD ["/backend"]

FROM base AS dev

WORKDIR /app

RUN go install github.com/githubnemo/CompileDaemon@latest

ENTRYPOINT CompileDaemon -build="go build -o /backend ./cmd" -command="/backend"
