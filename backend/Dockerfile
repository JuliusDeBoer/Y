FROM golang:latest AS builder

# enable Go modules support
ENV GO111MODULE=on

# WORKDIR $GOPATH/src/github.com/myrepo/myapp

# manage dependencies
COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy src code from the host and compile it
COPY cmd cmd
RUN CGO_ENABLED=0 GOOS=linux go build -a -o /backend ./cmd

FROM alpine:3.9
RUN apk --no-cache add ca-certificates
COPY --from=builder /backend /bin
CMD ["/bin/backend"]
